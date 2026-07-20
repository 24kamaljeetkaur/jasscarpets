from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "status",
        "created_at"
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "category",
        "price",
        "quantity",
        "featured",
        "status"
    )

    list_filter = (
        "category",
        "featured",
        "status"
    )

    search_fields = (
        "name",
        "category__name"
    )

    prepopulated_fields = {
        "slug": ("name",)
    }