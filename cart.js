document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const orderItems = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");

    let total = 0;

    // Simulación de productos
    const products = [
        { id: 1, name: "ROXIE RED OVERSHIRT", price: 189900, image: "img/camiseta_negra.jpg", talla: "S" },
        { id: 2, name: "Jeans Azules", price: 189900, image: "img/jeans_azules.jpg", talla: "XL" },
        { id: 3, name: "Zapatillas Deportivas", price: 189900, image: "img/zapatillas.jpg", talla: "M" },
        { id: 4, name: "Chaqueta de Cuero", price: 250000, image: "img/chaqueta_cuero.jpg", talla: "L" }
    ];

    // Render de productos y resumen inicial
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
                        data-price="${product.price}">
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

        // Añadir automáticamente al resumen
        addToOrder(product.name, product.price);
    });

    // Función para añadir producto
    function addToOrder(name, price) {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.setAttribute("data-name", name);
        orderItem.setAttribute("data-price", price);
        orderItem.innerHTML = `<p>${name} - $${price.toLocaleString()}</p>`;
        orderItems.appendChild(orderItem);
        total += price;
        updateTotal();
    }

    // Función para quitar un producto (una unidad)
    function removeFromOrder(name, price) {
        const items = document.querySelectorAll(`.order-item[data-name="${name}"]`);
        if (items.length > 0) {
            items[0].remove(); // Elimina solo una ocurrencia
            total -= price;
            updateTotal();
        }
    }

    // Actualizar total visualmente
    function updateTotal() {
        totalPriceElement.textContent = `$${total.toLocaleString()}`;
    }

    // Delegación de eventos para botones
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addToOrder(name, price);
        }

        if (event.target.classList.contains("remove-from-cart")) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            removeFromOrder(name, price);
        }
    });
});
