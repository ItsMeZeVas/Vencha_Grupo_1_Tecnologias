document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("featured-products-container");

    fetch('http://127.0.0.1:5000/producto')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            return response.json();
        })
        .then(products => {
            // Mezclar los productos aleatoriamente
            const shuffled = products.sort(() => 0.5 - Math.random());

            // Obtener los primeros 6 productos de la mezcla
            const selected = shuffled.slice(0, 6);

            selected.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");

                productElement.innerHTML = `
                    <a href="product.html?id=${product.id_producto}" class="product-link">
                        <img src="${product.imagen_url}" alt="${product.titulo}" class="product-image">
                        <p class="product-title">${product.titulo}</p>
                        <p class="product-price">$${Number(product.precio).toLocaleString('es-CO')}</p>
                    </a>
                `;

                productList.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos destacados:', error);
        });
});

