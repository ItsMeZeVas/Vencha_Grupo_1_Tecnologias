document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list-hombre");
    const notificacion = document.getElementById("notificacion");

    // Simulación de productos
    const products = [
        { id: 1, name: "Camisa Negra Básica Hombre", price: "$30.000", image: "FeaturedProducts/producto1.jpg" },
        { id: 2, name: "Camisa Oversize Tokio", price: "$40.000", image: "FeaturedProducts/producto3.jpg" },
        { id: 3, name: "Camisa Angel Warrior", price: "$40.000", image: "FeaturedProducts/producto5.jpg" },
        { id: 4, name: "Jeans azules", price: "$80.000", image: "FeaturedProducts/producto_jeans_azules.jpg" }
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
                <h3 class="product-price">${product.price}</h3>
                <button class="cart-button">Añadir al carrito</button>
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
