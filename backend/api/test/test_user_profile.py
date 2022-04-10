from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Profile, Category
from api.serializers import ProfileSerializer


REGIST_USER = '/api/register/'
PROFILE_URL = '/api/profile/'
TOKEN_URL = '/authen/jwt/create/'


class AuthorizedUserTokenApiTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    self.payload = {
        'email': 'dummy@mail.com',
        'password': 'dummy_pw'
    }
    get_user_model().objects.create_user(**self.payload)
    self.res = self.client.post(REGIST_USER, self.payload)

  def test_create_jwt_token(self):
    res = self.client.post(TOKEN_URL, self.payload)
    self.assertIn('refresh', res.data)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_not_unique_email(self):
    payload = {
        'email': 'dummy@mail.com',
        'password': 'dummy_pw'
    }
    res = self.client.post(REGIST_USER, payload)
    self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

  def test_jwt_token_invalid_credentials(self):
    payload = {
        'email': 'dummy@mail.com',
        'password': 'wrong'
    }
    res = self.client.post(TOKEN_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthorizedUserApiTest(TestCase):
  def setUp(self):
    self.client = APIClient()

  def test_regist_user(self):
    payload = {
        'email': 'dummy@mail.com',
        'password': 'dummy_pw'
    }
    res = self.client.post(REGIST_USER, payload)
    self.assertEqual(res.status_code, status.HTTP_201_CREATED)

  def test_not_create_email(self):
    payload = {
        'email': '',
        'password': 'dummy_pw'
    }
    res = self.client.post(REGIST_USER, payload)
    self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

  def test_not_create_password(self):
    payload = {
        'email': 'dummy@mail.com',
        'password': ''
    }
    res = self.client.post(REGIST_USER, payload)
    self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


def create_category(category_name):
  return Category.objects.create(name=category_name)


def create_profile(user, profile_name):
  return Profile.objects.create(userProfile=user, name=profile_name)


def detail_url(profile_id):
  return reverse('api:profile-detail', args=[profile_id])


def detail_category_url(category_id):
  return reverse('api:category-detail', args=[category_id])


class AuthorizedProfileApiTest(TestCase):
  def setUp(self):
    self.user = get_user_model().objects.create_user(
        email='dummy', password='dummy_pw')
    self.user2 = get_user_model().objects.create_user(
        email='dummy2', password='dummy_pw2')
    self.client = APIClient()
    self.token = str(RefreshToken.for_user(self.user).access_token)
    self.client.force_authenticate(user=self.user)
    self.client.credentials(HTTP_AUTHORIZATION=f"JWT {self.token}")

  def test_get_all_profile(self):
    category = create_category('Enginner')
    create_profile(user=self.user, profile_name='taro')
    create_profile(user=self.user2, profile_name='jiro')
    res = self.client.get(PROFILE_URL)
    profile = Profile.objects.all().order_by('id')
    serializer = ProfileSerializer(profile)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_get_single_profile(self):
    category = create_category('Enginner')
    profile = create_profile(user=self.user, profile_name='taro')
    url = detail_url(profile.id)
    res = self.client.get(url)
    serializer = ProfileSerializer(profile)
    self.assertEqual(res.status_code, status.HTTP_200_OK)

  def test_create_new_profile(self):
    category = create_category('Enginner')
    payload = {
        'name': 'taro',
        'category': category.id,

    }
    res = self.client.post(PROFILE_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    exists = Profile.objects.filter(
        name=payload['name']
    ).exists()
    self.assertTrue(exists)

  def test_create_new_profile_with_invalid(self):
    category = create_category('Enginner')
    payload = {
        'name': ''
    }
    res = self.client.post(PROFILE_URL, payload)
    self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

  def test_update_profile(self):
    category = create_category('Enginner')
    profile = create_profile(user=self.user, profile_name='taro')
    payload = {
        'name': 'jiro',
        'category': category.id
    }
    url = detail_url(profile.id)
    self.client.put(url, payload)
    profile.refresh_from_db()
    self.assertEqual(profile.name, payload['name'])

  def test_delete_profile(self):
    profile = create_profile(user=self.user, profile_name='taro')
    self.assertEqual(1, Profile.objects.count())
    url = detail_url(profile.id)
    self.client.delete(url)
    self.assertEqual(0, Profile.objects.count())
