// Registrar el Service Worker
if (navigator.serviceWorker && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    let swLocation = 'sw.js';
    if (window.location.href.includes('localhost')) {
        swLocation = 'sw.js';
    }
    navigator.serviceWorker.register(swLocation).catch(error => {
        console.error("Error al registrar el Service Worker:", error);
    });
}

// Referencias de jQuery
const titulo = $('#titulo');
const nuevoBtn = $('#nuevo-btn');
const salirBtn = $('#salir-btn');
const cancelarBtn = $('#cancel-btn');
const postBtn = $('#post-btn');
const avatarSel = $('#seleccion');
const timeline = $('#timeline');
const modal = $('#modal');
const modalAvatar = $('#modal-avatar');
const avatarBtns = $('.seleccion-avatar');
const txtMensaje = $('#txtMensaje');

// Usuario seleccionado
let usuario = null;

// Crear mensaje HTML
function crearMensajeHTML(mensaje, personaje) {
    const content = `
        <li class="animated fadeIn fast">
            <div class="avatar">
                <img src="img/avatars/${personaje}.jpg">
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <h3>@${personaje}</h3>
                    <br/>
                    ${mensaje}
                </div>
                <div class="arrow"></div>
            </div>
        </li>
    `;
    timeline.prepend(content);
    txtMensaje.val(''); // Limpiar mensaje
    cancelarBtn.click(); // Cerrar modal
}

// Manejo de inicio de sesión
function logIn(ingreso) {
    if (ingreso) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');
        titulo.text('Seleccione Personaje');
        usuario = null;
    }
}

// Selección de personaje
avatarBtns.on('click', function () {
    usuario = $(this).data('user');
    titulo.text('@' + usuario);
    logIn(true);
});

// Botón de salir
salirBtn.on('click', function () {
    logIn(false);
});

// Botón de nuevo mensaje
nuevoBtn.on('click', function () {
    modal.removeClass('oculto').animate({ opacity: 1, top: '50%' }, 200);
});

// Botón de cancelar mensaje
cancelarBtn.on('click', function () {
    modal.animate({ marginTop: '+=1000px', opacity: 0 }, 200, function () {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

// Botón de enviar mensaje
postBtn.off('click').on('click', function () {
    const mensaje = txtMensaje.val().trim();
    if (!mensaje || !usuario) {
        alert('Por favor, selecciona un personaje y escribe un mensaje.');
        return;
    }
    crearMensajeHTML(mensaje, usuario);
});
