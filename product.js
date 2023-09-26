// Listen for clicks on "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productName = event.target.getAttribute("data-product-name");
        const productPrice = parseFloat(event.target.getAttribute("data-product-price"));

        addToCart(productName, productPrice);

        button.addEventListener("click", (event) => {
            // Change the background color when clicked
            button.style.backgroundColor = "#333";
            }, 100);    
            // After a short delay, revert the background color
            setTimeout(() => {
                button.style.backgroundColor = "#ff5733";
            }, 100); // 200 milliseconds (adjust as needed)
        });
    });

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    const cart = getCart();
    cart.push({ name: productName, price: productPrice });
    saveCart(cart);
}

// Function to get the cart from local storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save the cart to local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}