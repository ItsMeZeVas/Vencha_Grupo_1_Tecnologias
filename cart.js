document.addEventListener("DOMContentLoaded", () => {
    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        alert("Debes iniciar sesión para ver el carrito.");
        window.location.href = "login.php";
        return;
    }

    const productList = document.getElementById("product-list"); // Catálogo
    const orderItems = document.getElementById("order-items");   // Productos en carrito
    const totalPriceElement = document.getElementById("total-price");
    const finalizarCompraBtn = document.querySelector(".buy-button");

    let carrito = [];

    // Renderiza el carrito con botón eliminar para cada producto
    function renderCarrito(productos) {
        orderItems.innerHTML = "";
        let total = 0;

        productos.forEach(producto => {
            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");

            orderItem.innerHTML = `
                <p style="display:inline-block; margin-right:10px;">
                    ${producto.titulo} - Cantidad: ${producto.cantidad} - $${Number(producto.precio).toLocaleString()}
                </p>
                <button class="remove-from-cart" data-id-producto="${producto.id_producto}" 
                        style="background:#e74c3c; color:#fff; border:none; padding:4px 8px; cursor:pointer; border-radius:3px;">
                    Eliminar
                </button>
            `;

            orderItems.appendChild(orderItem);
            total += producto.precio * producto.cantidad;
        });

        totalPriceElement.textContent = `$${total.toLocaleString()}`;
    }

    const products = [
        { id: 1, nombre: "Camisa Negra Básica Hombre", precio: 30000, imagen: "FeaturedProducts/producto1.jpg", talla: "S" },
        { id: 2, nombre: "Chaleco mujer", precio: 99900, imagen: "FeaturedProducts/producto_chaleco.jpg", talla: "XL" },
        { id: 3, nombre: "Jeans Azules", precio: 80000, imagen: "FeaturedProducts/producto_jeans_azules.jpg", talla: "M" },
        { id: 4, nombre: "Chaqueta de Cuero", precio: 250000, imagen: "FeaturedProducts/producto_chaqueta_cuero.jpg", talla: "L" }
    ];

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-container");

        productElement.innerHTML = `
            <section class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}" class="image-placeholder" />
            </section>
            <section class="product-details">
                <h2 class="product-name">${product.nombre}</h2>
                <p class="product-subtitle">Tallas: ${product.talla}</p>
                <p class="product-price-label">PRECIO: $${product.precio.toLocaleString()}</p>
                <button class="add-to-cart buy-button" 
                        data-id-producto="${product.id}" 
                        data-nombre="${product.nombre}" 
                        data-precio="${product.precio}" 
                        data-talla="${product.talla}">
                    Agregar
                </button>
            </section>
        `;

        productList.appendChild(productElement);
    });

    // Cargar carrito desde backend
    function cargarCarrito() {
        fetch(`http://127.0.0.1:5000/carrito/${usuarioId}`)
            .then(response => {
                if (!response.ok) throw new Error("No se pudo obtener el carrito");
                return response.json();
            })
            .then(data => {
                carrito = data;
                renderCarrito(carrito);
            })
            .catch(error => {
                console.error("Error al cargar el carrito:", error);
                alert("Hubo un problema al cargar tu carrito.");
            });
    }

    // Agregar producto al carrito
    productList.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const id_producto = e.target.dataset.idProducto;
            const cantidad = 1;

            fetch('http://127.0.0.1:5000/carrito/agregar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario: parseInt(usuarioId),
                    id_producto: parseInt(id_producto),
                    cantidad: cantidad
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.mensaje) {
                    alert(data.mensaje);
                    cargarCarrito();
                } else {
                    alert("Error al agregar producto al carrito");
                }
            })
            .catch(err => {
                console.error("Error al agregar al carrito:", err);
                alert("Error de conexión con el servidor");
            });
        }
    });

    // Eliminar producto del carrito (delegación)
    orderItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-from-cart")) {
            const id_producto = e.target.dataset.idProducto;

            fetch('http://127.0.0.1:5000/carrito/eliminar', {
                method: 'POST',  // Cambia a DELETE si tu API usa ese método
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario: parseInt(usuarioId),
                    id_producto: parseInt(id_producto)
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.mensaje) {
                    alert(data.mensaje);
                    cargarCarrito();
                } else {
                    alert("Error al eliminar el producto del carrito");
                }
            })
            .catch(err => {
                console.error("Error al eliminar del carrito:", err);
                alert("Error de conexión con el servidor");
            });
        }
    });

   finalizarCompraBtn?.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    // Redirigir a la página de finalización de compra
    window.location.href = "Pasarela.html"; // Cambia el nombre si tu archivo se llama diferente
    });
    cargarCarrito(); // Carga inicial del carrito
});
