// 1. Catálogo de imágenes por carpeta/categoría (solo agregá nombres de archivo acá)
const catalogoGaleria = {
    'carteleria': [
        'bandera_club_hockey.webp',
        'bandera_egresados.webp',
        'cartel_bicicleteria.webp',
        'lona_zumba.webp',
    ],
    'disenos-tarjetas': [
        'catalogo-ferreteria-qr.webp',
        'diseño_logotipo_estilista.webp',
        'etiqueta-marca-perfume.webp',
        'flyer-publicitario-estetica.webp',
        'flyer-taller-danza.webp',
        'folleto-menu-gastronomico.webp',
        'tarjetas-personales-emprendimiento.webp',
        'vinilo-decorativo-pared.webp',
    ],
    'stickers-pines': [
        'bolsitas-organza-personalizadas.webp',
        'llavero_personalizado.webp',
        'pines-prendedores-personalizados.webp',
        'sticker-troquelado-vintage.webp',
        'stickers-troquelados-ilustrados.webp',
    ],
    'sublimacion': [
        'body-bebe-personalizado.webp',
        'camiseta-argentina-personalizada.webp',
        'cinta_sublimada_bambu.webp',
        'cinta-raso-impresa-marca.webp',
        'gorra_sublimada_ElReparador.webp',
        'gorra_sublimada_polideportivo.webp',
        'remera_stitch.webp',
        'remera-infantil-motocross.webp',
        'taza_sublimada_foto.webp',
        'taza-personalizada-regalo.webp',
    ],
    'otros': [
        'album-figuritas-personalizado.webp',
        'cuadernos_anillados_personalizados.webp',
        'velas-personalizadas-ceremonia.webp',
    ]
};

// Nombres legibles para usar en el atributo alt y en el visor si no hay caption
const etiquetasCategoria = {
    'carteleria': 'Cartelería',
    'disenos-tarjetas': 'Diseños y tarjetas',
    'stickers-pines': 'Stickers y pines',
    'sublimacion': 'Sublimación',
    'otros': 'Otros trabajos'
};

// Configuración inicial
const LIMITE_INICIAL = 8;
let categoriaActual = 'todos';
let mostrarTodo = false;
let itemsMezclados = [];

function mezclarArray(array) {
    const copia=[...array];
    for(let i = copia.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Referencias del DOM
const contenedorGaleria = document.getElementById('galeria-grid');
const botonesFiltro = document.querySelectorAll('.filtro-btn');
const btnVerMas = document.getElementById('btn-ver-mas');

const modal = document.getElementById('visor-modal');
const imagenAmpliada = document.getElementById('imagen-ampliada');
const textoAmpliado = document.getElementById('texto-ampliado');
const botonCerrar = document.getElementById('cerrar-modal');

// Arma y mezcla la lista de items según la categoría elegida
function actualizarListaAleatoria() {
    const categorias = categoriaActual === 'todos'
        ? Object.keys(catalogoGaleria)
        :[categoriaActual];
    
    const items = [];
    categorias.forEach((cat) => {
        const archivos = catalogoGaleria[cat] || [];
        archivos.forEach((archivo) => {
            items.push({
                categoria: cat,
                src: `img/trabajos/${cat}/${archivo}`,
                alt: `${etiquetasCategoria[cat] || cat} - Idea Gráfica`
            });
        });
    });

    itemsMezclados = mezclarArray(items);

}

// Dibuja la galería respetando el límite inicial o "Ver más"
function renderizarGaleria() {
    if(!contenedorGaleria) return;

    const itemsVisibles = mostrarTodo
    ? itemsMezclados
    : itemsMezclados.slice(0, LIMITE_INICIAL);

    contenedorGaleria.innerHTML = '';

    if (itemsVisibles.length === 0) {
        contenedorGaleria.innerHTML = '<p>Pronto cargaremos fotos en esta categoria.</p>';
        if (btnVerMas) btnVerMas.style.display = 'none';
        return
    }

    itemsVisibles.forEach((item) => {
        const figure = document.createElement('figure');
        figure.className = 'item-galeria';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';

        figure.appendChild(img);
        contenedorGaleria.appendChild(figure);
    });

    // Control del botón "Ver más / Ver menos"
    if (btnVerMas) {
        if (itemsMezclados.length > LIMITE_INICIAL) {
            btnVerMas.style.display = 'inline-block';
            btnVerMas.textContent = mostrarTodo ? 'Ver menos trabajos' : 'Ver más trabajos';
        } else {
            btnVerMas.style.display = 'none';
        }
    }
}



// Eventos de botones de filtro
botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach((btn) => btn.classList.remove('activo'));
        boton.classList.add('activo');

        categoriaActual = boton.dataset.categoria;
        mostrarTodo = false;
        actualizarListaAleatoria();
        renderizarGaleria();
    });
});

// Evento del botón "Ver más / Ver menos"
if (btnVerMas) {
    btnVerMas.addEventListener('click', () => {
        mostrarTodo = !mostrarTodo;
        renderizarGaleria();
    });
}

// Delegación de clic en la galería para abrir el modal existente
if (contenedorGaleria && modal) {
    contenedorGaleria.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.item-galeria');
        if (!tarjeta) return;

        const img = tarjeta.querySelector('img');
        const caption = tarjeta.querySelector('figcaption');

        imagenAmpliada.src = img.src;
        imagenAmpliada.alt = img.alt;
        textoAmpliado.textContent = caption ? caption.textContent : img.alt;

        modal.style.display = 'flex';
    });
}

// Funciones para cerrar el modal
function cerrarVisor() {
    if (modal) modal.style.display = 'none';
}

if (botonCerrar) {
    botonCerrar.addEventListener('click', cerrarVisor);
}

if (modal) {
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            cerrarVisor();
        }
    });
}

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal && modal.style.display === 'flex') {
        cerrarVisor();
    }
});

// Render inicial al cargar la página
actualizarListaAleatoria();
renderizarGaleria();