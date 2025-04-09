document.getElementById("carrito").addEventListener("click", function () {
    let notificacion = document.getElementById("notificacion");

    // Obtener nombre del producto
    const nombre = document.querySelector(".product-details h2").textContent;
    const precioTexto = document.querySelector(".product-price").textContent;
    const precio = parseInt(precioTexto.replace(/\D/g, '')); // Extrae número

    // Obtener talla seleccionada
    const tallaSeleccionada = document.querySelector(".size-button.seleccionado");
    const talla = tallaSeleccionada ? tallaSeleccionada.textContent : "No especificada";

    // Crear objeto de producto
    const producto = { nombre, precio, talla };

    // Obtener carrito actual y añadir producto
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar notificación
    notificacion.style.display = "block";
    setTimeout(() => {
        notificacion.style.display = "none";
    }, 3000);
});
