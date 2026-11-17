// 1. Seleccionamos los elementos del HTML que vamos a manipular
const modal = document.getElementById('visor-modal');
const imagenAmpliada = document.getElementById('imagen-ampliada');
const textoAmpliado = document.getElementById('texto-ampliado');
const botonCerrar = document.getElementById('cerrar-modal');

// Seleccionamos TODAS las tarjetas de la galería (devuelve una lista)
const tarjetasGaleria = document.querySelectorAll('.item-galeria');

// 2. Recorremos cada tarjeta y le agregamos un "escuchador" de clics
tarjetasGaleria.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        // Buscamos la imagen y el texto dentro de la tarjeta que recibió el clic
        const img = tarjeta.querySelector('img');
        const caption = tarjeta.querySelector('figcaption');

        // Copiamos la ruta de la foto y el texto hacia el modal
        imagenAmpliada.src = img.src;
        imagenAmpliada.alt = img.alt;
        textoAmpliado.textContent = caption.textContent;

        // Cambiamos display: none por display: flex para mostrar el modal
        modal.style.display = 'flex';
    });
});

// 3. Función para cerrar el modal
function cerrarVisor() {
    modal.style.display = 'none';
}

// Cerrar al hacer clic en la X
botonCerrar.addEventListener('click', cerrarVisor);

// Cerrar al hacer clic en el fondo oscuro (fuera de la imagen)
modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        cerrarVisor();
    }
});

// Cerrar al presionar la tecla Escape
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.style.display === 'flex') {
        cerrarVisor();
    }
});