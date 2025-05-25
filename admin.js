document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".productos-container");
  const modal = document.getElementById("formulario-modal");
  const form = document.getElementById("formularioProducto");
  const nuevoBtn = document.getElementById("nuevoProducto");
  const cancelarBtn = document.getElementById("cancelar");
  let productoEditandoId = null; // null = nuevo producto, si tiene id = editar

  // Carga todos los productos desde API
  async function cargarProductos() {
    try {
      const res = await fetch("http://127.0.0.1:5000/producto");
      const productos = await res.json();

      container.innerHTML = "";

      productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <img src="${p.imagen_url}" alt="Producto">
          <div class="info">
            <h3>${p.titulo}</h3>
            <p>Talla: ${p.tallas_disponibles}</p>
            <p class="precio">$${p.precio.toLocaleString("es-CO")}</p>
          </div>
          <div class="acciones">
            <button class="editar" data-id="${p.id_producto}">EDITAR</button>
            <button class="eliminar" data-id="${p.id_producto}">ELIMINAR</button>
          </div>
        `;
        container.appendChild(div);
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  // Abre modal para nuevo producto
  nuevoBtn.addEventListener("click", () => {
    productoEditandoId = null;
    form.reset();
    modal.querySelector("h2").textContent = "Nuevo Producto";
    modal.classList.remove("oculto");
  });

  // Cerrar modal y limpiar
  cancelarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
    form.reset();
  });

  // Delegación para botones EDITAR y ELIMINAR dentro del contenedor productos
  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("editar")) {
      // Editar producto
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`http://127.0.0.1:5000/producto/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const producto = await res.json();

        // Llenar formulario con datos del producto
        form.titulo.value = producto.titulo || "";
        form.descripcion.value = producto.descripcion || "";
        form.imagen_url.value = producto.imagen_url || "";
        form.precio.value = producto.precio || "";
        form.tallas_disponibles.value = producto.tallas_disponibles || "";
        form.genero.value = producto.genero || "";

        productoEditandoId = id;
        modal.querySelector("h2").textContent = "Editar Producto";
        modal.classList.remove("oculto");
      } catch (error) {
        alert("Error al cargar producto para editar.");
        console.error(error);
      }
    } else if (e.target.classList.contains("eliminar")) {
      // Eliminar producto
      const id = e.target.dataset.id;
      if (confirm("¿Seguro quieres eliminar este producto?")) {
        try {
          const res = await fetch(`http://127.0.0.1:5000/producto/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Error eliminando producto");
          await cargarProductos();
        } catch (error) {
          alert("Error al eliminar producto.");
          console.error(error);
        }
      }
    }
  });

  // Enviar formulario para crear o actualizar producto
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      titulo: form.titulo.value,
      descripcion: form.descripcion.value,
      imagen_url: form.imagen_url.value,
      precio: parseInt(form.precio.value),
      tallas_disponibles: form.tallas_disponibles.value,
      genero: form.genero.value,
    };

    try {
      let res;
      if (productoEditandoId === null) {
        // Crear nuevo producto
        res = await fetch("http://127.0.0.1:5000/producto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProducto),
        });
      } else {
        // Actualizar producto existente
        res = await fetch(`http://127.0.0.1:5000/producto/${productoEditandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProducto),
        });
      }

      if (!res.ok) throw new Error("Error guardando producto");

      form.reset();
      modal.classList.add("oculto");
      await cargarProductos();
    } catch (error) {
      alert("Error guardando producto.");
      console.error(error);
    }
  });

  // Cerrar modal si clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("oculto");
      form.reset();
    }
  });

  // Carga inicial
  cargarProductos();
});
