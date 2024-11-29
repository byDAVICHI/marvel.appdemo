// sw producción
var url = window.location.href;
var swLocation = 'sw.js';

// Registrar el service worker solo si el protocolo es HTTP/HTTPS
if (navigator.serviceWorker && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    if (url.includes('localhost')) {
        swLocation = 'sw.js'; // Ajuste para entorno local
    }
    navigator.serviceWorker.register(swLocation).catch(error => {
        console.error("Error al registrar el Service Worker:", error);
    });
}

// Referencias de jQuery
var titulo = $('#titulo');
var nuevoBtn = $('#nuevo-btn');
var salirBtn = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn = $('#post-btn');
var avatarSel = $('#seleccion');
var timeline = $('#timeline');

var modal = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns = $('.seleccion-avatar');
var txtMensaje = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario = null;

// Crear un nuevo mensaje y agregarlo al timeline
function crearMensajeHTML(mensaje, personaje) {
    // Plantilla del mensaje
    var content = `
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

    // Agregar el mensaje al inicio del timeline
    timeline.prepend(content);

    // Limpiar el campo de texto y cerrar el modal
    txtMensaje.val('');
    cancelarBtn.click();
}

// Manejo de inicio de sesión
function logIn(ingreso) {
    if (ingreso) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');
        titulo.text('Seleccione Personaje');
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
    modal.removeClass('oculto');
    modal.animate({
        opacity: 1,
        top: '50%' // Centrar el modal
    }, 200);
});

// Botón de cancelar mensaje
cancelarBtn.on('click', function () {
    modal.animate({
        marginTop: '+=1000px',
        opacity: 0
    }, 200, function () {
        modal.addClass('oculto');
        txtMensaje.val(''); // Limpiar el campo de texto
    });
});

// Botón de enviar mensaje
postBtn.off('click').on('click', function () {
    var mensaje = txtMensaje.val().trim();

    // Validar que el mensaje no esté vacío
    if (mensaje === '') {
        cancelarBtn.click();
        return;
    }

    // Crear el mensaje en el timeline
    crearMensajeHTML(mensaje, usuario);
});
