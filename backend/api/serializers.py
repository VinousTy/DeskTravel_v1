from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Post, PostImage, Comments, Category, Monitor, Computer, Keyboard, Mouse, Speaker, Table, Chair, Other
from rest_auth.serializers import PasswordResetSerializer


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = get_user_model()
    fields = ('id', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = get_user_model().objects.create_user(**validated_data)
    return user


class CustomPasswordResetSerializer(PasswordResetSerializer):
  def get_email_options(self):
    data = {
        'email_template_name': 'email/password_reset.html',
        'subject_template_name': 'email/password_reset_subject.txt',
    }
    return data


class ProfileSerializer(serializers.ModelSerializer):
  created_on = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

  class Meta:
    model = Profile
    fields = ('id', 'name', 'userProfile', 'user_name',
              'self_introduction', 'category',  'img', 'created_on')
    extra_kwargs = {'userProfile': {'read_only': True}}


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('id', 'name')


class PostSerializer(serializers.ModelSerializer):
  created_on = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

  class Meta:
    model = Post
    fields = ('id', 'body', 'userPost', 'created_on', 'liked', 'bookmark')
    extra_kwargs = {'userPost': {'read_only': True}}


class PostImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostImage
    fields = ('id', 'img', 'postId')


class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comments
    fields = ('id', 'body', 'userComment', 'postId')
    extra_kwargs = {'userComment': {'read_only': True}}


class MonitorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Monitor
    fields = ('id', 'name', 'postId')


class ComputerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Computer
    fields = ('id', 'name', 'postId')


class KeyboardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Keyboard
    fields = ('id', 'name', 'postId')


class MouseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mouse
    fields = ('id', 'name', 'postId')


class SpeakerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Speaker
    fields = ('id', 'name', 'postId')


class TableSerializer(serializers.ModelSerializer):
  class Meta:
    model = Table
    fields = ('id', 'name', 'postId')


class ChairSerializer(serializers.ModelSerializer):
  class Meta:
    model = Chair
    fields = ('id', 'name', 'postId')


class OtherSerializer(serializers.ModelSerializer):
  class Meta:
    model = Other
    fields = ('id', 'name', 'postId')
