"use strict";

var addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    var productName = event.target.getAttribute("data-product-name");
    var productPrice = parseFloat(event.target.getAttribute("data-product-price"));
    addToCart(productName, productPrice);
    button.addEventListener("click", function (event) {
      button.style.backgroundColor = "#333";
    }, 100);
    setTimeout(function () {
      button.style.backgroundColor = "#ff5733";
    }, 100);
  });
});

function addToCart(productName, productPrice) {
  var cart = getCart();
  cart.push({
    name: productName,
    price: productPrice
  });
  saveCart(cart);
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//# sourceMappingURL=product.dev.js.map
