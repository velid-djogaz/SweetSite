"use strict";

// Function to display the cart items with images on the cart page
function displayCart() {
  var cartItemsContainer = document.querySelector(".cart-items");
  var cart = getCart();
  cartItemsContainer.innerHTML = ""; // Clear previous cart items

  cart.forEach(function (item) {
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = "\n            <img src=\"img/".concat(item.name.toLowerCase().replace(/\s+/g, '-'), ".jpg\" alt=\"").concat(item.name, "\" class=\"product-image\">\n            <div class=\"product-details\">\n                <h3>").concat(item.name, "</h3>\n                <span class=\"price\">$").concat(item.price.toFixed(2), "</span>\n            </div>\n            <button class=\"remove-button\" data-product-name=\"").concat(item.name, "\">Remove</button>\n        ");
    cartItemsContainer.appendChild(cartItem); // Add event listener for the "Remove" button

    var removeButton = cartItem.querySelector(".remove-button");
    removeButton.addEventListener("click", function () {
      var productName = removeButton.getAttribute("data-product-name");
      removeFromCart(productName);
    });
  });
} // Call the displayCart function when the cart.html page loads


window.addEventListener("DOMContentLoaded", function () {
  displayCart();
}); // Function to get the cart from local storage

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
} // Display the cart when the cart.html page loads


window.addEventListener("DOMContentLoaded", function () {
  displayCart();
}); // Function to remove a product from the cart one by one

function removeFromCart(productName) {
  var cart = getCart();
  var indexOfProductToRemove = cart.findIndex(function (item) {
    return item.name === productName;
  });

  if (indexOfProductToRemove !== -1) {
    // Remove one instance of the product
    cart.splice(indexOfProductToRemove, 1);
    saveCart(cart);
    displayCart();
    updateCartSummary(); // Update the cart summary after removing
  }
} // Function to update the cart summary


function updateCartSummary() {
  var cart = getCart();
  var totalItems = 0;
  var totalPrice = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      totalItems += 1; // Increment the quantity by 1 for each item

      totalPrice += item.price;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var totalItemsElement = document.getElementById("total-items");
  var totalPriceElement = document.getElementById("total-price");
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = "$".concat(totalPrice.toFixed(2));
} // Call the updateCartSummary function when the cart.html page loads initially to show the correct summary


window.addEventListener("DOMContentLoaded", function () {
  displayCart();
  updateCartSummary();
});
//# sourceMappingURL=cart.dev.js.map
