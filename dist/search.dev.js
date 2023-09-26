"use strict";

function filterProducts() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  var products = document.querySelectorAll(".product");
  products.forEach(function (product) {
    var productName = product.getAttribute("name").toLowerCase();

    if (productName.includes(searchInput)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

document.getElementById("searchInput").addEventListener("input", filterProducts);
document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    filterProducts();
  }
});
//# sourceMappingURL=search.dev.js.map
