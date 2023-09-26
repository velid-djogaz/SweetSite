"use strict";

// JavaScript to handle payment selection
var paymentOptions = document.querySelectorAll('input[name="payment"]');
var selectedPaymentMethod = null;
paymentOptions.forEach(function (option) {
  option.addEventListener("change", function (event) {
    selectedPaymentMethod = event.target.value; // You can perform additional actions here based on the selected method
  });
});
//# sourceMappingURL=payment.dev.js.map
