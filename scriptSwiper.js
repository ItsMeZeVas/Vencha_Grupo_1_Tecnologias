document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function getScrollAmount() {
        const product = document.querySelector(".product");
        if (!product) return 250; // Valor por defecto si no hay productos

        const productWidth = product.clientWidth + 20; // Ancho real + margen
        const screenWidth = window.innerWidth;

        return screenWidth <= 768 ? productWidth : productWidth * 3;
    }

    prevButton.addEventListener("click", function () {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", function () {
        carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
});