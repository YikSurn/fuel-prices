from django.conf.urls import patterns, url
from django.http import HttpRequest
from . import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'scholardeck.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^scholarship/filter_scholarship/$', views.filter_scholarship, name='filter_scholarship'),
    # url(r'^scholarship/field_group_options/$', views.field_group_options, name='field_group_options'),
    # url(r'^scholarship/country_options/$', views.country_options, name='country_options'),
    # url(r'^scholarship/scholarship_details/$', views.scholarship_details, name='scholarship_details'),
    # url(r'^scholarship/scholarship_application_entry/$', views.scholarship_application_entry, name='scholarship_application_entry'),

    # url(r'^scholarship_urls/$', views.scholarship_urls, name='scholarship_urls'),

    # url(r'^s3_credentials/$', views.s3_credentials, name='s3_credentials'),
)