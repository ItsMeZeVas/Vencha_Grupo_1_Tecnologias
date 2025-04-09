document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list-mujer");
    const notificacion = document.getElementById("notificacion");

    // Simulación de productos
    const products = [
        { id: 1, name: "Zapatillas Deportivas", price: "$110.000", image: "FeaturedProducts/producto_zapatillas_deportivas.jpg" },
        { id: 2, name: "Chaleco mujer", price: "$99.900", image: "FeaturedProducts/producto_chaleco.jpg"},
        { id: 3, name: "Chaqueta de Cuero", price: "$250.000", image: "FeaturedProducts/producto_chaqueta_cuero.jpg" },
        { id: 4, name: "Blusa Rojo Pasión", price: "$40.000", image: "FeaturedProducts/Producto2.jpg" }
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
