const grid = document.getElementById("show-info");

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
});


function mostrarSpinner() {
    grid.innerHTML = `
        <div class="d-flex justify-content-center align-items-center w-100 py-5" id="spinner-carga">
            <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
}

function cargarProductos() {

    
    const pagina = window.location.pathname.split('/').pop().replace('.html', '');
    

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {

            const productos = data[pagina]; // busca la clave que coincide con la página

            if (!productos) {
                console.warn(`No se encontró la categoría "${pagina}" en el JSON`);
                return;
            }

            productos.slice(0,6).forEach(item => {
                let article = document.createElement("article");
                article.className = "p-card";

                let pMedia = document.createElement("div");
                pMedia.className = "p-media";

                let imagen = document.createElement("img");
                imagen.src = item.image;
                imagen.alt = item.name;

                if (item.badge) {
                    let badge = document.createElement("span");
                    badge.className = "p-badge";
                    badge.textContent = item.badge;
                    pMedia.appendChild(badge);
                }

                let wishBtn = document.createElement("button");
                wishBtn.className = "p-wish";
                wishBtn.type = "button";
                wishBtn.setAttribute("aria-label", "Add to wishlist");
                wishBtn.textContent = "❤";

                pMedia.appendChild(imagen);
                pMedia.appendChild(wishBtn);

                let pBody = document.createElement("div");
                pBody.className = "p-body";

                let pRating = document.createElement("div");
                pRating.className = "p-rating";
                pRating.innerHTML = `<span class="stars">★★★★★</span><span class="score">${item.rating}</span>`;

                let pCat = document.createElement("div");
                pCat.className = "p-cat";
                pCat.textContent = item.category;

                let pName = document.createElement("h3");
                pName.className = "p-name";
                pName.textContent = item.name;

                let pBottom = document.createElement("div");
                pBottom.className = "p-bottom";

                let pPrice = document.createElement("div");
                pPrice.className = "p-price";
                pPrice.textContent = `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                let cartBtn = document.createElement("button");
                cartBtn.className = "p-cart";
                cartBtn.type = "button";
                cartBtn.setAttribute("aria-label", "Add to cart");
                cartBtn.innerHTML = `<svg class="bi bi-cart3" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`;

                cartBtn.addEventListener("click", function () {
                    localStorage.setItem('productoSeleccionado', JSON.stringify(item));
                    window.location.href = "tienda.html";
                });

                pBottom.appendChild(pPrice);
                pBottom.appendChild(cartBtn);

                pBody.appendChild(pRating);
                pBody.appendChild(pCat);
                pBody.appendChild(pName);
                pBody.appendChild(pBottom);

                article.appendChild(pMedia);
                article.appendChild(pBody);

                grid.appendChild(article);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}


function mostrarTodos(){
    const pagina = window.location.pathname.split('/').pop().replace('.html', '');
    
    mostrarSpinner(); 
    console.log('🔍 Página detectada:', pagina); 

    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {

            setTimeout(()=>{
                grid.innerHTML = '';
            const productos = data[pagina]; // busca la clave que coincide con la página

            if (!productos) {
                console.warn(`No se encontró la categoría "${pagina}" en el JSON`);
                return;
            }

            productos.forEach(item => {
                let article = document.createElement("article");
                article.className = "p-card";

                let pMedia = document.createElement("div");
                pMedia.className = "p-media";

                let imagen = document.createElement("img");
                imagen.src = item.image;
                imagen.alt = item.name;

                if (item.badge) {
                    let badge = document.createElement("span");
                    badge.className = "p-badge";
                    badge.textContent = item.badge;
                    pMedia.appendChild(badge);
                }

                let wishBtn = document.createElement("button");
                wishBtn.className = "p-wish";
                wishBtn.type = "button";
                wishBtn.setAttribute("aria-label", "Add to wishlist");
                wishBtn.textContent = "❤";

                pMedia.appendChild(imagen);
                pMedia.appendChild(wishBtn);

                let pBody = document.createElement("div");
                pBody.className = "p-body";

                let pRating = document.createElement("div");
                pRating.className = "p-rating";
                pRating.innerHTML = `<span class="stars">★★★★★</span><span class="score">${item.rating}</span>`;

                let pCat = document.createElement("div");
                pCat.className = "p-cat";
                pCat.textContent = item.category;

                let pName = document.createElement("h3");
                pName.className = "p-name";
                pName.textContent = item.name;

                let pBottom = document.createElement("div");
                pBottom.className = "p-bottom";

                let pPrice = document.createElement("div");
                pPrice.className = "p-price";
                pPrice.textContent = `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                let cartBtn = document.createElement("button");
                cartBtn.className = "p-cart";
                cartBtn.type = "button";
                cartBtn.setAttribute("aria-label", "Add to cart");
                cartBtn.innerHTML = `<svg class="bi bi-cart3" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`;

                cartBtn.addEventListener("click", function () {
                    localStorage.setItem('productoSeleccionado', JSON.stringify(item));
                    window.location.href = "tienda.html";
                });

                pBottom.appendChild(pPrice);
                pBottom.appendChild(cartBtn);

                pBody.appendChild(pRating);
                pBody.appendChild(pCat);
                pBody.appendChild(pName);
                pBody.appendChild(pBottom);

                article.appendChild(pMedia);
                article.appendChild(pBody);

                grid.appendChild(article);

            },1000);
            
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}
