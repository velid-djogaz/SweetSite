"use strict";

var paymentOptions = document.querySelectorAll('input[name="payment"]');
var selectedPaymentMethod = null;
paymentOptions.forEach(function (option) {
  option.addEventListener("change", function (event) {
    selectedPaymentMethod = event.target.value;
  });
});
//# sourceMappingURL=payment.dev.js.map
