"use strict";

// Listen for clicks on "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    var productName = event.target.getAttribute("data-product-name");
    var productPrice = parseFloat(event.target.getAttribute("data-product-price"));
    addToCart(productName, productPrice);
    button.addEventListener("click", function (event) {
      // Change the background color when clicked
      button.style.backgroundColor = "#333";
    }, 100); // After a short delay, revert the background color

    setTimeout(function () {
      button.style.backgroundColor = "#ff5733";
    }, 100); // 200 milliseconds (adjust as needed)
  });
}); // Function to add a product to the cart

function addToCart(productName, productPrice) {
  var cart = getCart();
  cart.push({
    name: productName,
    price: productPrice
  });
  saveCart(cart);
} // Function to get the cart from local storage


function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
} // Function to save the cart to local storage


function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//# sourceMappingURL=product.dev.js.map
