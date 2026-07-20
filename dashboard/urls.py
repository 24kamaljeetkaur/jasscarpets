from django.urls import path
from . import views

urlpatterns = [

    path("", views.dashboard, name="dashboard"),

    path("category/", views.category_list, name="category_list"),
    path("category/add/", views.category_add, name="category_add"),
    path("category/edit/<int:id>/", views.category_edit, name="category_edit"),
    path("category/delete/<int:id>/", views.category_delete, name="category_delete"),

    path("product/", views.product_list, name="product_list"),
    path("product/add/", views.product_add, name="product_add"),

]