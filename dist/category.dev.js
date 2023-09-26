"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var categoryButtons = document.querySelectorAll(".category-button");
  var products = document.querySelectorAll(".product");

  function filterProducts(category) {
    products.forEach(function (product) {
      var productCategories = product.getAttribute("data-category").split(" ");

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
    var fadeEffect = setInterval(function () {
      if (element.style.opacity < 1) {
        element.style.opacity = parseFloat(element.style.opacity) + 0.1;
      } else {
        clearInterval(fadeEffect);
      }
    }, 50);
  }

  function fadeOut(element) {
    element.style.opacity = 1;
    var fadeEffect = setInterval(function () {
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
      var selectedCategory = button.getAttribute("data-category");
      filterProducts(selectedCategory);
      categoryButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
});
//# sourceMappingURL=category.dev.js.map
