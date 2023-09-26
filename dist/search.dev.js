"use strict";

// Function to filter products based on the search input
function filterProducts() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  var products = document.querySelectorAll(".product");
  products.forEach(function (product) {
    var productName = product.getAttribute("name").toLowerCase();

    if (productName.includes(searchInput)) {
      product.style.display = "block"; // Show matching products
    } else {
      product.style.display = "none"; // Hide non-matching products
    }
  });
} // Event listeners


document.getElementById("searchInput").addEventListener("input", filterProducts); // Capture Enter key press and trigger the search

document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    filterProducts();
  }
});
//# sourceMappingURL=search.dev.js.map
