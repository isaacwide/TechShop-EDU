// ─── OBTENER Y GUARDAR ────────────────────────────────────────────────────────

function obtenerCarrito() { 
    return JSON.parse(localStorage.getItem('carrito') || '[]'); // Devuelve un arreglo de objetos { name, price, image, cantidad }
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
    actualizarContador();
    // Si estamos en carrito.html, vuelve a renderizar la página
    if (document.getElementById('cart-page-list')) renderizarPagina();
}

function actualizarContador() {
    // Suma todas las cantidades y actualiza el badge del ícono del carrito
    const total = obtenerCarrito().reduce((s, i) => s + i.cantidad, 0);
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = total;
        el.style.display = total === 0 ? 'none' : 'flex';
    });
}

// ─── ACCIONES ────────────────────────────────────────────────────────────────

function agregarAlCarrito(producto, cantidad = 1) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(i => i.name === producto.name); // Busca si el producto ya existe en el carrito
    if (idx > -1) {
        carrito[idx].cantidad += Number(cantidad); // Si existe, suma la cantidad
    } else {
        carrito.push({ ...producto, cantidad: Number(cantidad) }); // Si no existe, lo agrega como nuevo
    }
    guardarCarrito(carrito);
    mostrarNotificacion(producto.name);
}

function eliminarDelCarrito(nombre) {
    // Filtra el carrito excluyendo el producto con ese nombre
    guardarCarrito(obtenerCarrito().filter(i => i.name !== nombre));
}

function cambiarCantidad(nombre, delta) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(i => i.name === nombre);
    if (idx === -1) return; // Si no se encuentra el producto, no hace nada
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1); // Si la cantidad llega a 0, elimina el producto
    guardarCarrito(carrito);
}

// ─── COMPRAR ─────────────────────────────────────────────────────────────────

function comprarCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) { alert('Tu carrito está vacío.'); return; }
    const resumen = carrito.map(i => `${i.cantidad} x ${i.name}`).join('\n'); // Genera el resumen de la compra
    alert(`✅ Compra simulada:\n\n${resumen}`);
    guardarCarrito([]); // Vacía el carrito después de la compra
}

// ─── NOTIFICACIÓN ────────────────────────────────────────────────────────────

function mostrarNotificacion(nombre) {
    // Crea el elemento de notificación si no existe todavía en el DOM
    let notificacion = document.getElementById('cart-toast');
    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.id = 'cart-toast';
        notificacion.style.cssText = `
            position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%) translateY(20px);
            background:#1a1a2e; color:#fff; padding:.65rem 1.25rem; border-radius:8px;
            border:1px solid rgba(0,217,255,.3); font-size:.875rem; opacity:0;
            pointer-events:none; transition:opacity .3s,transform .3s; z-index:10000; white-space:nowrap;`;
        document.body.appendChild(notificacion);
    }
    notificacion.textContent = `✅ "${nombre}" agregado al carrito`;
    notificacion.style.opacity = '1';
    notificacion.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(notificacion._t);
    // Oculta la notificación después de 2.5 segundos
    notificacion._t = setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2500);
}

// ─── RENDERIZAR PÁGINA CARRITO ───────────────────────────────────────────────

function renderizarPagina() {
    const lista   = document.getElementById('cart-page-list');  // Contenedor de los productos
    const empty   = document.getElementById('cart-empty');      // Estado vacío
    const grid    = document.querySelector('.cart-page-grid');  // Grid de dos columnas
    const subEl   = document.getElementById('cart-subtotal');   // Elemento del subtotal
    const totEl   = document.getElementById('cart-total');      // Elemento del total
    if (!lista) return; // Si no estamos en carrito.html, no hace nada

    const carrito = obtenerCarrito();
    lista.innerHTML = ''; // Limpia la lista antes de volver a renderizar

    if (carrito.length === 0) {
        // Muestra el estado vacío y oculta el grid
        if (grid)  grid.style.display  = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }

    // Muestra el grid y oculta el estado vacío
    if (grid)  grid.style.display  = '';
    if (empty) empty.style.display = 'none';

    // Crea una fila por cada producto en el carrito
    carrito.forEach(item => {
        const fila = document.createElement('div');
        fila.className = 'cart-page-item';
        fila.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-page-item-info">
                <p class="cart-page-item-cat">${item.category || ''}</p>
                <p class="cart-page-item-name">${item.name}</p>
                <p class="cart-page-item-price">$${(item.price * item.cantidad).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <div class="cart-page-item-qty">
                    <button class="qty-btn" data-action="dec" data-name="${item.name}">−</button>
                    <span>${item.cantidad}</span>
                    <button class="qty-btn" data-action="inc" data-name="${item.name}">+</button>
                </div>
            </div>
            <button class="cart-page-item-remove" data-name="${item.name}" title="Eliminar">✕</button>
        `;
        lista.appendChild(fila);
    });

    // Event delegation: un solo listener maneja todos los botones de la lista
    lista.onclick = e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const nombre = btn.dataset.name;
        if (btn.dataset.action === 'inc') cambiarCantidad(nombre, 1);        // Aumentar cantidad
        else if (btn.dataset.action === 'dec') cambiarCantidad(nombre, -1);  // Disminuir cantidad
        else if (btn.classList.contains('cart-page-item-remove')) eliminarDelCarrito(nombre); // Eliminar
    };

    // Calcula y muestra el total
    const total = carrito.reduce((s, i) => s + i.price * i.cantidad, 0);
    const formatear = n => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (subEl) subEl.textContent = formatear(total);
    if (totEl) totEl.textContent = formatear(total);
}

// ─── INICIO ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador(); // Actualiza el badge del carrito al cargar la página

    // Hace que el ícono del carrito en el header lleve a carrito.html
    document.querySelectorAll('a.carrito').forEach(a => {
        a.href = 'carrito.html';
    });

    // Solo si estamos en carrito.html: renderiza la lista y conecta el botón comprar
    if (document.getElementById('cart-page-list')) {
        renderizarPagina();
        const btnComprar = document.getElementById('btn-comprar');
        if (btnComprar) btnComprar.addEventListener('click', comprarCarrito);
    }
});