document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-button");
    const products = document.querySelectorAll(".product");

    function filterProducts(category) {
        products.forEach(function (product) {
            const productCategories = product.getAttribute("data-category").split(" ");
            if (category === "sve" || productCategories.includes(category)) {
                fadeIn(product);
            } else {
                fadeOut(product);
            }
        });
    }

    function fadeIn(element) {
        element.style.display = "block";
        element.style.opacity = 0;

        const fadeEffect = setInterval(function () {
            if (element.style.opacity < 1) {
                element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 50);
    }

    function fadeOut(element) {
        element.style.opacity = 1;

        const fadeEffect = setInterval(function () {
            if (element.style.opacity > 0) {
                element.style.opacity = parseFloat(element.style.opacity) - 0.1;
            } else {
                element.style.display = "none";
                clearInterval(fadeEffect);
            }
        }, 50);
    }

    filterProducts("sve");

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.getAttribute("data-category");
            filterProducts(selectedCategory);

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });
    });
});