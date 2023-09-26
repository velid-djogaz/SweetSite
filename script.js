// Function to calculate the total price from the cart
function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2); // Ensure it's formatted as a valid price (e.g., 10.00)
  }

  // Ensure the PayPal SDK has loaded
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        // Get the cart items and calculate the total price
        const cart = getCart(); // Replace with your function to get the cart
        const totalPrice = calculateTotalPrice(cart);

        // Set up the transaction
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice, // Use the calculated total price
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        // Capture the funds from the transaction
        return actions.order.capture().then(function (details) {
          // Handle the successful payment (e.g., show a success message)
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
    })
    .render('#paypal-button-container');