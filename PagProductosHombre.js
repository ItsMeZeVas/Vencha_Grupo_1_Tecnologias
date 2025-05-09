document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list-hombre");
    const notificacion = document.getElementById("notificacion");

    // Asumiendo que deseas filtrar por "hombre", pasas ese género como parámetro
    const genero = 'Hombre'; // Cambia este valor por el género que deseas mostrar

    // Realizar la solicitud para obtener los productos desde la API
    fetch('http://127.0.0.1:5000/producto')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(products => {
            // Filtrar productos por género
            const filteredProducts = products.filter(product => product.genero === genero);

            // Verificar si hay productos filtrados
            if (filteredProducts.length === 0) {
                console.log(`No se encontraron productos para el género "${genero}".`);
            }

            // Generación dinámica de productos
            filteredProducts.forEach(product => {
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
