document.getElementById("carrito").setAttribute("data-id-producto", productId);

// Escuchar click después de tener data-id-producto
document.getElementById("carrito").addEventListener("click", function () {
    const notificacion = document.getElementById("notificacion");

    const id_usuario = localStorage.getItem('usuario_id');
    if (!id_usuario) {
        alert('Por favor inicia sesión para añadir productos al carrito.');
        window.location.href = 'login.php';
        return;
    }

    const nombre = document.getElementById("product-title").textContent;
    const precioTexto = document.getElementById("product-price").textContent;
    const precio = parseInt(precioTexto.replace(/\D/g, ''));

    const tallaSeleccionada = document.querySelector(".size-button.seleccionado");
    const talla = tallaSeleccionada ? tallaSeleccionada.textContent : "No especificada";

    const id_producto = parseInt(document.getElementById("carrito").getAttribute("data-id-producto"));
    if (!id_producto) {
        alert("Error: no se pudo identificar el producto.");
        return;
    }

    const cantidad = 1;

    fetch('http://127.0.0.1:5000/carrito/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_usuario: parseInt(id_usuario),
            id_producto: parseInt(id_producto),
            cantidad: cantidad
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            let carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
            carritoLocal.push({ nombre, precio, talla, id_producto, cantidad });
            localStorage.setItem("carrito", JSON.stringify(carritoLocal));

            notificacion.textContent = data.mensaje;
            notificacion.style.display = "block";
            notificacion.style.opacity = "1";

            setTimeout(() => {
                notificacion.style.opacity = "0";
                setTimeout(() => notificacion.style.display = "none", 500);
            }, 3000);
        } else {
            alert("Error al añadir al carrito");
        }
    })
    .catch(error => {
        console.error('Error al añadir al carrito:', error);
        alert('Error de conexión con el servidor');
    });
});
