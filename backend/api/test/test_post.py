from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Post, PostImage, Category

POST_URL = '/api/post/'
POST_IMAGE_URL = '/api/post-image/'


def create_post_image(post, img):
  return PostImage.objects.create(postId=post, img=img)


def create_post(user, **params):
  default = {
      'body': 'test_body',
  }
  default.update(params)
  return Post.objects.create(userPost=user, **default)


def detail_post_url(post_id):
  return reverse('api:post-detail', args=[post_id])


def detail_post_img_url(postImage_id):
  return reverse('api:postImage-detail', args=[postImage_id])


class AuthorizedPostApiTest(TestCase):
  def setUp(self):
    self.user = get_user_model().objects.create_user(
        email='dummy', password='dummy_pw')
    self.user2 = get_user_model().objects.create_user(
        email='dummy2', password='dummy_pw2')
    self.client = APIClient()
    self.token = str(RefreshToken.for_user(self.user).access_token)
    self.client.force_authenticate(user=self.user)
    self.client.credentials(HTTP_AUTHORIZATION=f"JWT {self.token}")

  def test_get_post(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    res = self.client.get(POST_URL)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_get_single_post(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    url = detail_post_url(post.id)
    res = self.client.get(url)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_create_new_post(self):
    payload = {
        'body': 'test_body',
        'userPost': self.user,
        'liked': self.user2.id,
        'bookmark': self.user2.id,
    }
    res = self.client.post(POST_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    post = Post.objects.get(id=res.data['id'])
    self.assertEqual(payload['body'], post.body)
    self.assertEqual(payload['userPost'], post.userPost)

  def test_create_new_post_with_invalid(self):
    payload = {
        'body': '',
        'userPost': '',
        'liked': self.user2.id,
        'bookmark': self.user2.id,
    }
    res = self.client.post(POST_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

  def test_update_post(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    payload = {
        'body': 'change_body',
        'userPost': self.user,
        'liked': self.user2.id,
        'bookmark': self.user2.id,
    }
    url = detail_post_url(post.id)
    self.client.put(url, payload)
    post.refresh_from_db()
    self.assertEqual(post.body, payload['body'])

  def test_delete_post(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    self.assertEqual(1, Post.objects.count())
    url = detail_post_url(post.id)
    self.client.delete(url)
    self.assertEqual(0, Post.objects.count())

  def test_get_postImage(self):
    post = create_post(user=self.user)
    post.liked.add(self.user2.id)
    post.bookmark.add(self.user)
    postImage = create_post_image(post, '2demo1.jpeg')
    res = self.client.get(POST_IMAGE_URL)
    self.assertEqual(res.status_code, status.HTTP_200_OK)
