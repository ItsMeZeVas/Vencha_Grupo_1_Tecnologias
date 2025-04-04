document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const notificacion = document.getElementById("notificacion");

    // Simulación de productos
    const products = [
        { id: 1, name: "ROXIE RED OVERSHIRT", price: "$189.900", image: "img/camiseta_negra.jpg" },
        { id: 2, name: "Jeans Azules", price: "$189.900", image: "img/jeans_azules.jpg" },
        { id: 3, name: "Zapatillas Deportivas", price: "$189.900", image: "img/zapatillas.jpg" },
        { id: 4, name: "Chaqueta de Cuero", price: "$250.000", image: "img/chaqueta_cuero.jpg" }
    ];

    // Generación dinámica de productos
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-container");
        productElement.innerHTML = `
            <section class="product-image">
                <div class="image-placeholder" style="width: 100%; height: 100%; background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
            </section>

            <section class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-subtitle">Tallas</p>
                <div class="size-options">
                    <button class="size-button">XS</button>
                    <button class="size-button">S</button>
                    <button class="size-button">M</button>
                    <button class="size-button">L</button>
                    <button class="size-button">XL</button>
                </div>

                <p class="product-price-label">PRECIO:</p>
                <p class="product-price">${product.price}</p>
                <button class="cart-button">Añadir al carrito</button>
                <button class="buy-button">Comprar Ahora</button>
            </section>
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

        // Función para seleccionar talla
        const botonesTalla = productElement.querySelectorAll(".size-button");
        botonesTalla.forEach(boton => {
            boton.addEventListener("click", function () {
                botonesTalla.forEach(btn => btn.classList.remove("seleccionado"));
                this.classList.add("seleccionado");
            });
        });
    });
});
