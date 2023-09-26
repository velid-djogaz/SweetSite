"use strict";

// Function to update the cart summary
function updateCartSummary() {
  var cart = getCart(); // Get the cart items (you should have a function to get cart items)
  // Calculate total items and total price

  var totalItems = 0;
  var totalPrice = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      totalItems += item.quantity; // Assuming each item in the cart has a 'quantity' property

      totalPrice += item.quantity * item.price;
    } // Update the HTML elements in the cart summary

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

  var cartQuantityElement = document.getElementById("cart-quantity");
  var cartTotalElement = document.getElementById("cart-total");
  cartQuantityElement.textContent = totalItems;
  cartTotalElement.textContent = totalPrice.toFixed(2); // Format total price with two decimal places
} // Call the updateCartSummary function whenever items are added or removed from the cart
// You should have functions for adding/removing items from the cart
// Call updateCartSummary() after those operations
// Example of adding an item to the cart:


function addToCart(productName, price) {
  var cart = getCart(); // Get the cart items

  var existingItem = cart.find(function (item) {
    return item.name === productName;
  });

  if (existingItem) {
    // If the product already exists in the cart, increment its quantity
    existingItem.quantity++;
  } else {
    // If it's a new product, add it to the cart
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  } // Save the updated cart to local storage


  saveCart(cart); // Update the cart summary

  updateCartSummary();
} // Example of removing an item from the cart:


function removeFromCart(productName) {
  var cart = getCart(); // Get the cart items
  // Find the index of the item to remove

  var index = cart.findIndex(function (item) {
    return item.name === productName;
  });

  if (index !== -1) {
    // If the item exists in the cart, remove it
    cart.splice(index, 1); // Save the updated cart to local storage

    saveCart(cart); // Update the cart summary

    updateCartSummary();
  }
} // Call updateCartSummary() when the page loads initially to show the correct summary


window.addEventListener("DOMContentLoaded", function () {
  updateCartSummary();
});
//# sourceMappingURL=cartSummary.dev.js.map
