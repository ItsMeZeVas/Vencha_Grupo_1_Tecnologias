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
                        <button class="cart-button" data-id-producto="${product.id_producto}">Añadir al carrito</button>
                    </div>
                `;

                productList.appendChild(productElement);

                // Evento para la notificación del carrito
                const cartButton = productElement.querySelector(".cart-button");
                cartButton.addEventListener("click", function () {
    const id_usuario = localStorage.getItem('usuario_id'); // Obtén el usuario desde localStorage
    if (!id_usuario) {
        alert('Por favor inicia sesión para añadir productos al carrito.');
        window.location.href = 'login.php'; // Cambia a tu página de login
        return;
    }

    const id_producto = this.getAttribute('data-id-producto');
    const cantidad = 1; // Puedes cambiar si quieres cantidad dinámica

    fetch('http://127.0.0.1:5000/carrito/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_usuario: parseInt(id_usuario),
            id_producto: parseInt(id_producto),
            cantidad: cantidad
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            notificacion.textContent = data.mensaje;
            notificacion.style.display = "block";
            notificacion.style.opacity = "1";

            setTimeout(() => {
                notificacion.style.opacity = "0";
                setTimeout(() => notificacion.style.display = "none", 500);
            }, 2000);
        } else {
            alert('Error al añadir al carrito');
        }
    })
    .catch(error => {
        console.error('Error al añadir al carrito:', error);
        alert('Error de conexión con el servidor');
    });
});
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
