from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    name = models.CharField(max_length=100)

    slug = models.SlugField(unique=True, blank=True)

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