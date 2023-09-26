function displayCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="img/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg" alt="${item.name}" class="product-image">
            <div class="product-details">
                <h3>${item.name}</h3>
                <span class="price">$${item.price.toFixed(2)}</span>
            </div>
            <button class="remove-button" data-product-name="${item.name}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        const removeButton = cartItem.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            const productName = removeButton.getAttribute("data-product-name");
            removeFromCart(productName);
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

window.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function removeFromCart(productName) {
    const cart = getCart();
    const indexOfProductToRemove = cart.findIndex((item) => item.name === productName);

    if (indexOfProductToRemove !== -1) {
        cart.splice(indexOfProductToRemove, 1);
        saveCart(cart);
        displayCart();
        updateCartSummary();
    }
}

function updateCartSummary() {
    const cart = getCart();
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cart) {
        totalItems += 1;
        totalPrice += item.price;
    }

    const totalItemsElement = document.getElementById("total-items");
    const totalPriceElement = document.getElementById("total-price");

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

window.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartSummary();
});