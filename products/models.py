from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    name = models.CharField(max_length=100)

    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="category/")

    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=200)

    slug = models.SlugField(unique=True, blank=True)

    image = models.ImageField(upload_to="products/")

    short_description = models.TextField(blank=True)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    old_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    quantity = models.PositiveIntegerField(default=0)

    featured = models.BooleanField(default=False)

    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name