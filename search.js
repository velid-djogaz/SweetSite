function filterProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach((product) => {
        const productName = product.getAttribute("name").toLowerCase();

        if (productName.includes(searchInput)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

document.getElementById("searchInput").addEventListener("input", filterProducts);

document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        filterProducts();
    }
});