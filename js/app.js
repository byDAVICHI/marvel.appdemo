//sw produccion
var url=window.location.href;
var swLocation='/appdemo/sw.js';

// AGREGAR BLOQUE 1
// Solo registrar el service worker si estamos en localhost o en producción (HTTP/HTTPS)
if (navigator.serviceWorker && window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    var swLocation = '/appdemo/sw.js';
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

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario;

postBtn.on('click', function() {
    var mensaje = txtMensaje.val();
    if (mensaje.trim() === '') {
        cancelarBtn.click();
        return;  // Evita crear un mensaje vacío
    }

    crearMensajeHTML(mensaje, usuario);
});

nuevoBtn.on('click', function() {
    console.log("Botón de nuevo clickeado");
    modal.removeClass('oculto');
    modal.animate({ 
        opacity: 1,
        top: '50%' // Ajusta la posición del modal
    }, 200);
});


// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

} 



// Globals
function logIn( ingreso ) {

    if ( ingreso ) {
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


// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {

    logIn(false);

});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {
    modal.removeClass('oculto');
    modal.animate({ 
        opacity: 1,  // Asegúrate de que se vea el modal
        top: '50%'    // Coloca el modal en la posición centrada
    }, 200 );
});

// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
   modal.animate({ 
       marginTop: '+=1000px',
       opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    crearMensajeHTML( mensaje, usuario );

});