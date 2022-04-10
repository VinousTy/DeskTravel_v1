from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Post, Category, Comments


POST_URL = '/api/post/'
COMMENT_URL = '/api/comment/'


def create_comment(user, post, body):
  return Comments.objects.create(userComment=user, postId=post, body=body)


def create_post(user, **params):
  default = {
      'body': 'test_body',
  }
  default.update(params)
  return Post.objects.create(userPost=user, **default)


def detail_post_url(post_id):
  return reverse('api:post-detail', args=[post_id])


def detail_comment_url(comment_id):
  return reverse('api:comment-detail', args=[comment_id])


class AuthorizedCommentApiTest(TestCase):
  def setUp(self):
    self.user = get_user_model().objects.create_user(
        email='dummy', password='dummy_pw')
    self.user2 = get_user_model().objects.create_user(
        email='dummy2', password='dummy_pw2')
    self.client = APIClient()
    self.token = str(RefreshToken.for_user(self.user).access_token)
    self.client.force_authenticate(user=self.user)
    self.client.credentials(HTTP_AUTHORIZATION=f"JWT {self.token}")

  def test_get_comment(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    comment = create_comment(user=self.user, post=post, body='test-comment')
    res = self.client.get(COMMENT_URL)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_create_new_comment(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    payload = {
        'body': 'test-comment',
        'postId': post.id,
        'userComment': self.user.id
    }
    res = self.client.post(COMMENT_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    comment = Comments.objects.get(id=res.data['id'])
    self.assertEqual(payload['body'], comment.body)
