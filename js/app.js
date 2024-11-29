//sw produccion
var url=window.location.href;
var swLocation='/sw.js';

// AGREGAR BLOQUE 1
// Solo registrar el service worker si estamos en localhost o en producción (HTTP/HTTPS)
if (navigator.serviceWorker && window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    var swLocation = '/sw.js';
    if (url.includes('localhost')) {
        swLocation = '/sw.js';  // Ajuste para el entorno local
    }
    navigator.serviceWorker.register(swLocation).catch(error => {
        console.error("Error al registrar el Service Worker:", error);
    });
}

if ( navigator.serviceWorker){
    if(url.includes('localhost')){
        swLocation='/sw.js'
    }
    navigator.serviceWorker.register(swLocation);
}
// Referencias de jQuery

// Referencias de jQuery
var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');
var modal       = $('#modal');
var txtMensaje  = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario;

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});
//
// Botón de cancelar mensaje
cancelarBtn.on('click', function() {
    // Animar el cierre del modal y limpiar el campo de texto
    modal.animate({ 
        marginTop: '+=1000px',
        opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val(''); // Limpiar el mensaje
    });
});

// Botón de enviar mensaje
postBtn.on('click', function() {
    var mensaje = txtMensaje.val().trim(); // Eliminar espacios al inicio y al final
    if (mensaje.length === 0) {
        cancelarBtn.click(); // Si el mensaje está vacío, cerrar el modal
        return;
    }

    // Crear el mensaje y agregarlo al timeline
    crearMensajeHTML(mensaje, usuario);
    cancelarBtn.click(); // Cerrar el modal después de enviar
});

// Función para crear el mensaje HTML
function crearMensajeHTML(mensaje, personaje) {
    var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${personaje}.jpg" alt="${personaje}">
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
    
    // Agregar el mensaje al principio del timeline
    timeline.prepend(content);
}

// Selección de personaje
avatarBtns.on('click', function() {
    usuario = $(this).data('user'); // Asignar el usuario (personaje seleccionado)
    titulo.text('@' + usuario); // Cambiar el título para mostrar el nombre del personaje
    logIn(true);
});

// Función para mostrar u ocultar el contenido según el estado de logueo
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

// Botón de salir
salirBtn.on('click', function() {
    logIn(false);
});
