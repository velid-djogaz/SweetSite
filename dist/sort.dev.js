"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var sortSelect = document.getElementById("sort-select");
  var productSection = document.querySelector(".product-section"); // Add event listener to the sorting select element

  sortSelect.addEventListener("change", function () {
    var selectedOption = sortSelect.value;

    if (selectedOption === "low-to-high") {
      sortProductsByPrice(true); // Ascending order
    } else if (selectedOption === "high-to-low") {
      sortProductsByPrice(false); // Descending order
    } else if (selectedOption === "default") {
      // Reset to default view (original order)
      resetDefaultView();
    }
  }); // Function to sort products by price

  function sortProductsByPrice(ascending) {
    var products = Array.from(productSection.querySelectorAll(".product"));
    products.sort(function (a, b) {
      var priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
      var priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
      return ascending ? priceA - priceB : priceB - priceA;
    }); // Clear the product section and re-append the sorted products

    productSection.innerHTML = "";
    products.forEach(function (product) {
      productSection.appendChild(product);
    });
  } // Function to reset to default view (original order)


  function resetDefaultView() {
    // You should have a data attribute that stores the original order index
    var products = Array.from(productSection.querySelectorAll(".product"));
    products.sort(function (a, b) {
      var indexA = parseInt(a.getAttribute("data-original-order"));
      var indexB = parseInt(b.getAttribute("data-original-order"));
      return indexA - indexB;
    }); // Clear the product section and re-append the products in original order

    productSection.innerHTML = "";
    products.forEach(function (product) {
      productSection.appendChild(product);
    });
  }
});
//# sourceMappingURL=sort.dev.js.map
