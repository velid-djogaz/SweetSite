"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var sortSelect = document.getElementById("sort-select");
  var productSection = document.querySelector(".product-section");
  sortSelect.addEventListener("change", function () {
    var selectedOption = sortSelect.value;

    if (selectedOption === "low-to-high") {
      sortProductsByPrice(true);
    } else if (selectedOption === "high-to-low") {
      sortProductsByPrice(false);
    } else if (selectedOption === "default") {
      resetDefaultView();
    }
  });

  function sortProductsByPrice(ascending) {
    var products = Array.from(productSection.querySelectorAll(".product"));
    products.sort(function (a, b) {
      var priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
      var priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
      return ascending ? priceA - priceB : priceB - priceA;
    });
    productSection.innerHTML = "";
    products.forEach(function (product) {
      productSection.appendChild(product);
    });
  }

  function resetDefaultView() {
    var products = Array.from(productSection.querySelectorAll(".product"));
    products.sort(function (a, b) {
      var indexA = parseInt(a.getAttribute("data-original-order"));
      var indexB = parseInt(b.getAttribute("data-original-order"));
      return indexA - indexB;
    });
    productSection.innerHTML = "";
    products.forEach(function (product) {
      productSection.appendChild(product);
    });
  }
});
//# sourceMappingURL=sort.dev.js.map
