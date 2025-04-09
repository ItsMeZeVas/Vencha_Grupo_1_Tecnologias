document.addEventListener("DOMContentLoaded", () => {
  const resumenLista = document.querySelector(".order-summary ul");
  const costos = document.querySelector(".order-costs");
  const totalElement = costos.querySelector(".total");
  const totalItemsElement = costos.querySelector("p:nth-child(1)");

  const productos = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

  resumenLista.innerHTML = ""; // Limpia productos actuales

  let total = 0;

  productos.forEach(producto => {
    const item = document.createElement("li");
    item.textContent = `${producto.name} - $${producto.price.toLocaleString()}`;
    resumenLista.appendChild(item);
    total += producto.price;
  });

  const envio = 5000; // Puedes cambiar o calcular esto dinámicamente
  totalItemsElement.textContent = `Total ítems: $${total.toLocaleString()}`;
  totalElement.textContent = `Total: $${(total + envio).toLocaleString()}`;

  costos.querySelector("p:nth-child(2)").textContent = `Envío: $${envio.toLocaleString()}`;
});
