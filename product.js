const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productName = event.target.getAttribute("data-product-name");
        const productPrice = parseFloat(event.target.getAttribute("data-product-price"));

        addToCart(productName, productPrice);

        button.addEventListener("click", (event) => {
            button.style.backgroundColor = "#333";
            }, 100);    
            setTimeout(() => {
                button.style.backgroundColor = "#ff5733";
            }, 100);
        });
    });

function addToCart(productName, productPrice) {
    const cart = getCart();
    cart.push({ name: productName, price: productPrice });
    saveCart(cart);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}