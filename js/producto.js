document.addEventListener('DOMContentLoaded', function () {
    const productoGuardado = localStorage.getItem('productoSeleccionado');

    if (productoGuardado) {
        const producto = JSON.parse(productoGuardado);
        mostrarProducto(producto);
    } else {
        window.location.href = "index.html";
    }
});

function mostrarProducto(producto) {
    const display = document.getElementById("product-display");
    const details = document.getElementById("product-details");

    // Actualiza el título de la pestaña
    document.title = `TECHCORE | ${producto.name}`;

    // Badge
    if (producto.badge) {
        let badge = document.createElement("span"); //Creamos el elemento badge
        badge.className = "p-badge"; //Le asignamos la clase para estilos
        badge.textContent = producto.badge; //Le asignamos el texto del badge desde el JSON
        display.appendChild(badge);//Lo agregamos al contenedor del producto
    }

    // Imagen
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

    // Rating
    let rating = document.createElement("div");
    rating.className = "p-rating";
    rating.innerHTML = `<span class="stars">★★★★★</span><span class="score">${producto.rating}</span>`;
    display.appendChild(rating);

    // Separador
    let divider = document.createElement("div");
    divider.className = "prod-divider";
    display.appendChild(divider);

    // Precio
    let precio = document.createElement("p");
    precio.className = "p-price";
    precio.textContent = `$${producto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;//Formateamos el precio con comas y dos decimales
    display.appendChild(precio);

    // Descripción
    if (producto.description) {
        let descripcion = document.createElement("p");
        descripcion.textContent = producto.description;
        details.appendChild(descripcion);
    }
}

// Formulario de compra
document.getElementById("buy-form").addEventListener("submit", function (e) {
    e.preventDefault();// Evita que el formulario se envíe y recargue la página
    const cantidad = document.getElementById("cantidad").value; // Obtiene la cantidad seleccionada
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));// Obtiene el producto seleccionado del localStorage
    alert(`✅ Compra simulada: ${cantidad} x ${producto.name}`); // Muestra una alerta simulando la compra
    this.reset();
});