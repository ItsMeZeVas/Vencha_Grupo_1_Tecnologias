document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const orderItems = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    const finalizarCompraBtn = document.querySelector(".buy-button");
    let total = 0;

    const productosLS = JSON.parse(localStorage.getItem("carrito")) || [];

    productosLS.forEach(product => {
        addToOrder(product.nombre, product.precio, product.talla);
    });

    const products = [
        { id: 1, name: "Camisa Negra Básica Hombre", price: 30000, image: "FeaturedProducts/producto1.jpg", talla: "S" },
        { id: 2, name: "Chaleco mujer", price: 99900, image: "FeaturedProducts/producto_chaleco.jpg", talla: "XL" },
        { id: 3, name: "Jeans Azules", price: 80000, image: "FeaturedProducts/producto_jeans_azules.jpg", talla: "M" },
        { id: 4, name: "Chaqueta de Cuero", price: 250000, image: "FeaturedProducts/producto_chaqueta_cuero.jpg", talla: "L" }
    ];

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-container");

        productElement.innerHTML = `
            <section class="product-image">
                <div class="image-placeholder" style="background-image: url('${product.image}');"></div>
            </section>
            <section class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-subtitle">Tallas: ${product.talla}</p>
                <p class="product-price-label">PRECIO: $${product.price.toLocaleString()}</p>
                <button class="add-to-cart buy-button" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-talla="${product.talla}">
                    Agregar
                </button>
                <button class="remove-from-cart buy-button" 
                        data-id="${product.id}" 
                        data-name="${product.name}" 
                        data-price="${product.price}">
                    Quitar
                </button>
            </section>
        `;

        productList.appendChild(productElement);
    });

    function addToOrder(name, price, talla = "No especificada") {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.setAttribute("data-name", name);
        orderItem.setAttribute("data-price", price);
        orderItem.innerHTML = `<p>${name} - Talla: ${talla} - $${price.toLocaleString()}</p>`;
        orderItems.appendChild(orderItem);
        total += price;
        updateTotal();
    }

    function removeFromOrder(name, price) {
        const items = document.querySelectorAll(`.order-item[data-name="${name}"]`);
        if (items.length > 0) {
            items[0].remove();
            total -= price;
            updateTotal();
        }
    }

    function updateTotal() {
        totalPriceElement.textContent = `$${total.toLocaleString()}`;
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            const talla = event.target.dataset.talla;
            addToOrder(name, price, talla);
        }

        if (event.target.classList.contains("remove-from-cart")) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            removeFromOrder(name, price);
        }
    });

    finalizarCompraBtn?.addEventListener("click", () => {
        const items = document.querySelectorAll(".order-item");
        const productosSeleccionados = [];

        items.forEach(item => {
            const name = item.getAttribute("data-name");
            const price = parseFloat(item.getAttribute("data-price"));
            productosSeleccionados.push({ name, price });
        });

        if (productosSeleccionados.length > 0) {
            localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
            localStorage.removeItem("carrito"); // Limpiar carrito original
            window.location.href = "pasarela.html";
        } else {
            alert("No hay productos en el carrito.");
        }
    });
});
