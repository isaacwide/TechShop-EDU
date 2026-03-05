document.addEventListener('DOMContentLoaded', function () {
    const productoGuardado = localStorage.getItem('productoSeleccionado'); // Lee el producto guardado desde la página anterior

    if (productoGuardado) {
        const producto = JSON.parse(productoGuardado);
        mostrarProducto(producto);
    } else {
        window.location.href = "index.html"; // Si no hay producto guardado, regresa al inicio
    }
});

function mostrarProducto(producto) {
    const display = document.getElementById("product-display"); // Columna izquierda: imagen y datos principales
    const details = document.getElementById("product-details"); // Columna derecha: descripción

    // Actualiza el título de la pestaña del navegador
    document.title = `TECHCORE | ${producto.name}`;

    // Badge (ej. "NEW ARRIVAL")
    if (producto.badge) {
        let badge = document.createElement("span");
        badge.className = "p-badge";
        badge.textContent = producto.badge;
        display.appendChild(badge);
    }

    // Imagen del producto
    let img = document.createElement("img");
    img.src = producto.image;
    img.alt = producto.name;
    display.appendChild(img);

    // Categoría
    let categoria = document.createElement("p");
    categoria.className = "p-cat";
    categoria.textContent = producto.category;
    display.appendChild(categoria);

    // Nombre
    let nombre = document.createElement("h2");
    nombre.className = "p-name";
    nombre.textContent = producto.name;
    display.appendChild(nombre);

    // Calificación con estrellas
    let rating = document.createElement("div");
    rating.className = "p-rating";
    rating.innerHTML = `<span class="stars">★★★★★</span><span class="score">${producto.rating}</span>`;
    display.appendChild(rating);

    // Línea divisora
    let divider = document.createElement("div");
    divider.className = "prod-divider";
    display.appendChild(divider);

    // Precio formateado con comas y dos decimales
    let precio = document.createElement("p");
    precio.className = "p-price";
    precio.textContent = `$${producto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    display.appendChild(precio);

    // Descripción (solo si existe en el JSON)
    if (producto.description) {
        let descripcion = document.createElement("p");
        descripcion.textContent = producto.description;
        details.appendChild(descripcion);
    }
}

// Agrega el producto al carrito al enviar el formulario
document.getElementById("buy-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario recargue la página
    const cantidad = parseInt(document.getElementById("cantidad").value) || 1; // Obtiene la cantidad, mínimo 1
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado')); // Recupera el producto del localStorage
    agregarAlCarrito(producto, cantidad); // Llama a la función del carrito con el producto y cantidad
    this.reset(); // Reinicia el formulario a sus valores por defecto
    alert(`✅ Agregado al carrito: ${cantidad} x ${producto.name}`);
});