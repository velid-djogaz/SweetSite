"use strict";

function calculateTotalPrice(cart) {
  var totalPrice = 0;
  cart.forEach(function (item) {
    totalPrice += parseFloat(item.price);
  });
  return totalPrice.toFixed(2);
}

paypal.Buttons({
  createOrder: function createOrder(data, actions) {
    var cart = getCart();
    var totalPrice = calculateTotalPrice(cart);
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: totalPrice
        }
      }]
    });
  },
  onApprove: function onApprove(data, actions) {
    return actions.order.capture().then(function (details) {
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');
//# sourceMappingURL=script.dev.js.map
