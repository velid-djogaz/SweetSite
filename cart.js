// Function to display the cart items with images on the cart page
function displayCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cart = getCart();

    cartItemsContainer.innerHTML = ""; // Clear previous cart items

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

        // Add event listener for the "Remove" button
        const removeButton = cartItem.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            const productName = removeButton.getAttribute("data-product-name");
            removeFromCart(productName);
        });
    });
}

// Call the displayCart function when the cart.html page loads
window.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

// Function to get the cart from local storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Display the cart when the cart.html page loads
window.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

// Function to remove a product from the cart one by one
function removeFromCart(productName) {
    const cart = getCart();
    const indexOfProductToRemove = cart.findIndex((item) => item.name === productName);

    if (indexOfProductToRemove !== -1) {
        // Remove one instance of the product
        cart.splice(indexOfProductToRemove, 1);
        saveCart(cart);
        displayCart();
        updateCartSummary(); // Update the cart summary after removing
    }
}

// Function to update the cart summary
function updateCartSummary() {
    const cart = getCart();
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cart) {
        totalItems += 1; // Increment the quantity by 1 for each item
        totalPrice += item.price;
    }

    const totalItemsElement = document.getElementById("total-items");
    const totalPriceElement = document.getElementById("total-price");

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Call the updateCartSummary function when the cart.html page loads initially to show the correct summary
window.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartSummary();
});