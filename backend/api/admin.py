from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from . import models


class UserAdmin(BaseUserAdmin):
  ordering = ['id']
  list_display = ['email']
  fieldsets = (
      (None, {'fields': ('email', 'password')}),
      (_('Personal Info'), {'fields': ()}),
      (
          _('Permissions'),
          {
              'fields': (
                  'is_active',
                  'is_staff',
                  'is_superuser',
              )
          }
      ),
      (_('Important dates'), {'fields': ('last_login',)}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2')
      }),
  )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile)
admin.site.register(models.Category)
admin.site.register(models.Post)
admin.site.register(models.PostImage)
admin.site.register(models.Comments)
admin.site.register(models.Monitor)
admin.site.register(models.Computer)
admin.site.register(models.Keyboard)
admin.site.register(models.Mouse)
admin.site.register(models.Speaker)
admin.site.register(models.Table)
admin.site.register(models.Chair)
admin.site.register(models.Other)
