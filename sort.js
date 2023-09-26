document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sort-select");
    const productSection = document.querySelector(".product-section");

    sortSelect.addEventListener("change", function () {
        const selectedOption = sortSelect.value;

        if (selectedOption === "low-to-high") {
            sortProductsByPrice(true);
        } else if (selectedOption === "high-to-low") {
            sortProductsByPrice(false);
        } else if (selectedOption === "default") {
            resetDefaultView();
        }
    });

    function sortProductsByPrice(ascending) {
        const products = Array.from(productSection.querySelectorAll(".product"));
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
            return ascending ? priceA - priceB : priceB - priceA;
        });

        productSection.innerHTML = "";
        products.forEach((product) => {
            productSection.appendChild(product);
        });
    }

    function resetDefaultView() {
        const products = Array.from(productSection.querySelectorAll(".product"));
        products.sort((a, b) => {
            const indexA = parseInt(a.getAttribute("data-original-order"));
            const indexB = parseInt(b.getAttribute("data-original-order"));
            return indexA - indexB;
        });

        productSection.innerHTML = "";
        products.forEach((product) => {
            productSection.appendChild(product);
        });
    }
});