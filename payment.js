// JavaScript to handle payment selection
const paymentOptions = document.querySelectorAll('input[name="payment"]');
let selectedPaymentMethod = null;

paymentOptions.forEach((option) => {
    option.addEventListener("change", (event) => {
        selectedPaymentMethod = event.target.value;
        // You can perform additional actions here based on the selected method
    });
});