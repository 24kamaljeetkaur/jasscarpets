from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.text import slugify
from products.models import Category, Product
@login_required
def dashboard(request):

    return render(request,"dashboard/index.html")


@login_required
def category_list(request):

    categories = Category.objects.all()

    return render(
        request,
        "dashboard/category/index.html",
        {
            "categories":categories
        }
    )


@login_required
def category_add(request):

    if request.method=="POST":

        Category.objects.create(

            name=request.POST["name"],
            slug=request.POST["slug"],
            description=request.POST.get("description", ""),
            image=request.FILES["image"],
            status=True if request.POST.get("status") else False

        )

        return redirect("category_list")

    return render(
        request,
        "dashboard/category/add.html"
    )


@login_required
def category_edit(request,id):

    category=get_object_or_404(Category,id=id)

    if request.method=="POST":

        category.name=request.POST["name"]
        category.slug = slugify(category.name)
        category.status=True if request.POST.get("status") else False

        if request.FILES.get("image"):
            category.image=request.FILES["image"]

        category.save()

        return redirect("category_list")

    return render(
        request,
        "dashboard/category/edit.html",
        {
            "category":category
        }
    )


@login_required
def category_delete(request,id):

    category=get_object_or_404(Category,id=id)

    category.delete()

    return redirect("category_list")


@login_required
def product_list(request):

    products = Product.objects.select_related("category")

    return render(request,
        "dashboard/product/index.html",
        {
            "products": products
        }
    )


@login_required
def product_add(request):

    categories = Category.objects.filter(status=True)

    if request.method == "POST":

        Product.objects.create(
            category=Category.objects.get(id=request.POST["category"]),
            name=request.POST["name"],
            price=request.POST["price"],
            old_price=request.POST.get("old_price") or None,
            quantity=request.POST["quantity"],
            short_description=request.POST["short_description"],
            image=request.FILES["image"],
            featured="featured" in request.POST,
            status="status" in request.POST,
        )

        return redirect("product_list")

    return render(
        request,
        "dashboard/product/add.html",
        {
            "categories": categories
        }
    )