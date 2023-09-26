function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  }

  paypal
    .Buttons({
      createOrder: function (data, actions) {
        const cart = getCart();
        const totalPrice = calculateTotalPrice(cart);

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice,
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
    })
    .render('#paypal-button-container');