"use strict";

// Function to calculate the total price from the cart
function calculateTotalPrice(cart) {
  var totalPrice = 0;
  cart.forEach(function (item) {
    totalPrice += parseFloat(item.price);
  });
  return totalPrice.toFixed(2); // Ensure it's formatted as a valid price (e.g., 10.00)
} // Ensure the PayPal SDK has loaded


paypal.Buttons({
  createOrder: function createOrder(data, actions) {
    // Get the cart items and calculate the total price
    var cart = getCart(); // Replace with your function to get the cart

    var totalPrice = calculateTotalPrice(cart); // Set up the transaction

    return actions.order.create({
      purchase_units: [{
        amount: {
          value: totalPrice // Use the calculated total price

        }
      }]
    });
  },
  onApprove: function onApprove(data, actions) {
    // Capture the funds from the transaction
    return actions.order.capture().then(function (details) {
      // Handle the successful payment (e.g., show a success message)
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');
//# sourceMappingURL=script.dev.js.map
