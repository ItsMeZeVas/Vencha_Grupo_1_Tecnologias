document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  const nombreInput = document.getElementById("nombre");
  const telefonoInput = document.getElementById("telefono");
  const correoInput = document.getElementById("correo");

  // Cargar datos guardados si existen
  const savedData = JSON.parse(localStorage.getItem("datosPerfil"));
  if (savedData) {
    nombreInput.value = savedData.nombre || "";
    telefonoInput.value = savedData.telefono || "";
    correoInput.value = savedData.correo || "";
  }

  // Validar y guardar datos
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const correo = correoInput.value.trim();

    if (!nombre || !telefono || !correo) {
      alert("Por favor, complete todos los campos antes de actualizar.");
      return;
    }

    const datos = {
      nombre,
      telefono,
      correo
    };

    localStorage.setItem("datosPerfil", JSON.stringify(datos));
    alert("Información actualizada correctamente.");
  });
});
