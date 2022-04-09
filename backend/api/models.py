from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django_mysql.models import ListCharField


def upload_avatar_path(instance, filename):
  ext = filename.split('.')[-1]
  return '/'.join(['avatars', str(instance.userProfile.id)+str(instance.name)+str('.')+str(ext)])


def upload_post_path(instance, filename):
  return '/'.join(['posts', str(instance.postId.userPost.id)+str(instance.img)])


class UserManager(BaseUserManager):
  def create_user(self, email, password=None):
    if not email:
      raise ValueError('メールアドレスは必須です。')

    user = self.model(email=self.normalize_email(email))
    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, email, password):
    user = self.create_user(email, password)
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)

    return user


class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=50, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)

  objects = UserManager()

  USERNAME_FIELD = 'email'

  def __str__(self):
    return self.email


class Category(models.Model):
  name = models.CharField(max_length=50)

  def __str__(self):
    return self.name


class Profile(models.Model):
  name = models.CharField(max_length=50)
  userProfile = models.OneToOneField(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='userProfile')
  user_name = models.CharField(max_length=50, blank=True, null=True)
  category = models.ForeignKey(
      Category, on_delete=models.CASCADE, related_name='category', blank=True, null=True
  )
  self_introduction = models.CharField(max_length=150, blank=True, null=True)
  img = models.ImageField(blank=True, null=True,
                          upload_to=upload_avatar_path)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name


class Post(models.Model):
  body = models.CharField(max_length=255)
  userPost = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='userPost')
  liked = models.ManyToManyField(
      settings.AUTH_USER_MODEL, related_name='liked', blank=True)
  bookmark = models.ManyToManyField(
      settings.AUTH_USER_MODEL, related_name='bookmark', blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.body


class PostImage(models.Model):
  img = models.ImageField(blank=True, null=True,
                          upload_to=upload_post_path)
  postId = models.ForeignKey(
      Post, on_delete=models.CASCADE, related_name='postId')

  def __str__(self):
    return self.img


class Comments(models.Model):
  body = models.CharField(max_length=100)
  userComment = models.ForeignKey(
      settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='userComment')
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.body


class Monitor(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Computer(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Keyboard(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Mouse(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Speaker(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Table(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Chair(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name


class Other(models.Model):
  name = models.CharField(max_length=255, blank=True, null=True)
  postId = models.ForeignKey(Post, on_delete=models.CASCADE)

  def __str__(self):
    return self.name
