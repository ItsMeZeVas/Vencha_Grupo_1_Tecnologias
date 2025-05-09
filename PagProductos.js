document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list-hombre");
    const notificacion = document.getElementById("notificacion");

    // Realizar la solicitud para obtener los productos desde la API
    fetch('http://127.0.0.1:5000/producto')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(products => {
            // Generación dinámica de productos
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-card");
                productElement.innerHTML = `
                    <div class="product-image">
                        <a href="product.html?id=${product.id_producto}">
                            <img src="${product.imagen_url}" alt="${product.titulo}">
                        </a>
                    </div>
                    <div class="product-details">
                        <h2 class="product-name">${product.titulo}</h2>
                        <p class="product-price-label">PRECIO:</p>
                        <h3 class="product-price">$${Number(product.precio).toLocaleString('es-CO')}</h3>
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
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
