document.getElementById("carrito").addEventListener("click", function() {
    let notificacion = document.getElementById("notificacion");
    
    notificacion.style.display = "block"; // Muestra la notificación
    
    setTimeout(function() {
        notificacion.style.display = "none"; // Oculta la notificación después de 3 segundos
    }, 3000);
});
// Seleccionar todos los botones de talla
const botonesTalla = document.querySelectorAll(".size-button");

if (botonesTalla.length > 0) {
    botonesTalla.forEach(boton => {
        boton.addEventListener("click", function() {
            // Remover la clase "seleccionado" de todos los botones
            botonesTalla.forEach(btn => btn.classList.remove("seleccionado"));

            // Agregar la clase "seleccionado" solo al botón clickeado
            this.classList.add("seleccionado");
        });
    });
}
