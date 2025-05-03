document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

  function getScrollAmount() {
    const product = document.querySelector(".product");
    if (!product) return 0;

    const productWidth = product.clientWidth; 
    const screenWidth = window.innerWidth;

    return screenWidth <= 768 ? productWidth : productWidth * 3.1;
}

    prevButton.addEventListener("click", function () {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        setTimeout(checkButtons, 500); // Verificar botones después del desplazamiento
    });

    nextButton.addEventListener("click", function () {
        carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        setTimeout(checkButtons, 500);
    });

});