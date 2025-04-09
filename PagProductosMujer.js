document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list-mujer");
    const notificacion = document.getElementById("notificacion");

    // Simulación de productos
    const products = [
        { id: 1, name: "Camisa Negra Básica Mujer", price: "$30.000", image: "img/camiseta_negra.jpg" },
        { id: 2, name: "Jeans Azules", price: "$80.000", image: "img/jeans_azules.jpg" },
        { id: 3, name: "Zapatillas Deportivas", price: "$110.000", image: "img/zapatillas.jpg" },
        { id: 4, name: "Chaqueta de Cuero", price: "$250.000", image: "img/chaqueta_cuero.jpg" },
        { id: 5, name: "Camisa Blanca", price: "$99.900", image: "img/camisa_blanca.jpg" },
        { id: 6, name: "Gorra Negra", price: "$49.900", image: "img/gorra_negra.jpg" }
    ];

    // Generación dinámica de productos
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price-label">PRECIO:</p>
                <p class="product-price">${product.price}</p>
                <button class="cart-button">Añadir al carrito</button>
                <a href="cart.html" class="buy-button">Comprar Ahora</a>
            </div>
        `;

        productList.appendChild(productElement);

        // Evento para la notificación del carrito
        const cartButton = productElement.querySelector(".cart-button");
        cartButton.addEventListener("click", function () {
            notificacion.style.display = "block";
            notificacion.style.opacity = "1";

            setTimeout(() => {
                notificacion.style.opacity = "0";
                setTimeout(() => notificacion.style.display = "none", 500);
            }, 2000);
        });

    });
});
