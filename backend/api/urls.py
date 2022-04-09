from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()
router.register('user', views.UserView)
router.register('profile', views.ProfileView)
router.register('category', views.CategoryViewSet)
router.register('post', views.PostViewSet)
router.register('post-image', views.PostImageViewSet)
router.register('comment', views.CommentViewSet)
router.register('monitor', views.MonitorViewSet)
router.register('computer', views.ComputerViewSet)
router.register('keyboard', views.KeyboardViewSet)
router.register('mouse', views.MouseViewSet)
router.register('speaker', views.SpeakerViewSet)
router.register('table', views.TableViewSet)
router.register('chair', views.ChairViewSet)
router.register('other', views.OtherViewSet)

urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('mypost/', views.PostListView.as_view(), name='mypost'),
    path('', include(router.urls))
]
