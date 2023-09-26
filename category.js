// JavaScript to handle category filtering and apply active class
document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-button");
    const products = document.querySelectorAll(".product");

    // Function to filter products based on category with fade-in/fade-out animation
    function filterProducts(category) {
        products.forEach(function (product) {
            const productCategories = product.getAttribute("data-category").split(" ");
            if (category === "sve" || productCategories.includes(category)) {
                fadeIn(product); // Fade in matching products
            } else {
                fadeOut(product); // Fade out non-matching products
            }
        });
    }

    // Function to fade in an element
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

    // Function to fade out an element
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

    // Initial filter when the page loads (show all products)
    filterProducts("sve");

    // Add click event listeners to category buttons
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.getAttribute("data-category");
            filterProducts(selectedCategory);

            // Add and remove the 'active' class for styling
            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });
    });
});