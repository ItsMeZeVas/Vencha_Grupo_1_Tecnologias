document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function getScrollAmount() {
        const productWidth = 250; // 200px ancho + 10px margen a cada lado
        const screenWidth = window.innerWidth;

        return screenWidth <= 768 ? productWidth : productWidth * 3;
    }

    prevButton.addEventListener("click", function () {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", function () {
        carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    // Asegurar que al cambiar el tamaño de la pantalla, se ajuste el scrollAmount dinámicamente
    window.addEventListener("resize", function () {
        getScrollAmount();
    });
});