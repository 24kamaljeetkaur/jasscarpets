from django.shortcuts import render

from products.models import Category, Product


def home(request):

    categories = Category.objects.filter(status=True)

    products = Product.objects.filter(
        status=True
    )[:8]

    context = {

        "categories": categories,
        "products": products

    }

    return render(
        request,
        "website/home.html",
        context
    )