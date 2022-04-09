from rest_framework import permissions, status, generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from . import serializers
from .models import User, Profile, Post, Comments, Category, PostImage, Monitor, Computer, Keyboard, Mouse, Speaker, Table, Chair, Other


class CreateUserView(generics.CreateAPIView):
  serializer_class = serializers.UserSerializer
  permission_classes = (AllowAny,)


class UserView(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = serializers.UserSerializer


class ProfileView(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = serializers.ProfileSerializer

  def perform_create(self, serializers):
    serializers.save(userProfile=self.request.user)

  def get_queryset(self):
    queryset = Profile.objects.all()
    name = self.request.query_params.get('name', None)
    if name is not None:
      queryset = queryset.filter(name=name)
    return queryset


class MyProfileListView(generics.ListAPIView):
  queryset = Profile.objects.all()
  serializer_class = serializers.ProfileSerializer

  def get_queryset(self):
    return self.queryset.filter(userProfile=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = serializers.CategorySerializer

  def destroy(self, request, *args, **kwargs):
    response = {'message': 'DELETE method is not allowed'}
    return Response(response, status=status.HTTP_400_BAD_REQUEST)

  def update(self, request, *args, **kwargs):
    response = {'message': 'PUT method is not allowed'}
    return Response(response, status=status.HTTP_400_BAD_REQUEST)

  def partial_update(self, request, *args, **kwargs):
    response = {'message': 'PATCH method is not allowed'}
    return Response(response, status=status.HTTP_400_BAD_REQUEST)


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = serializers.PostSerializer

  def perform_create(self, serializer):
    serializer.save(userPost=self.request.user)


class PostListView(generics.ListAPIView):
  queryset = Post.objects.all()
  serializer_class = serializers.PostSerializer

  def get_queryset(self):
    return self.queryset.filter(userPost=self.request.user)


class PostImageViewSet(viewsets.ModelViewSet):
  queryset = PostImage.objects.all()
  serializer_class = serializers.PostImageSerializer


class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comments.objects.all()
  serializer_class = serializers.CommentSerializer

  def perform_create(self, serializer):
    serializer.save(userComment=self.request.user)


class MonitorViewSet(viewsets.ModelViewSet):
  queryset = Monitor.objects.all()
  serializer_class = serializers.MonitorSerializer


class ComputerViewSet(viewsets.ModelViewSet):
  queryset = Computer.objects.all()
  serializer_class = serializers.ComputerSerializer


class KeyboardViewSet(viewsets.ModelViewSet):
  queryset = Keyboard.objects.all()
  serializer_class = serializers.KeyboardSerializer


class MouseViewSet(viewsets.ModelViewSet):
  queryset = Mouse.objects.all()
  serializer_class = serializers.MouseSerializer


class SpeakerViewSet(viewsets.ModelViewSet):
  queryset = Speaker.objects.all()
  serializer_class = serializers.SpeakerSerializer


class TableViewSet(viewsets.ModelViewSet):
  queryset = Table.objects.all()
  serializer_class = serializers.TableSerializer


class ChairViewSet(viewsets.ModelViewSet):
  queryset = Chair.objects.all()
  serializer_class = serializers.ChairSerializer


class OtherViewSet(viewsets.ModelViewSet):
  queryset = Other.objects.all()
  serializer_class = serializers.OtherSerializer
