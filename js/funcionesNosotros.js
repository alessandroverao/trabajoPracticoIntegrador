// Obtener el boton
let mybutton = document.getElementById("btn-back-to-top");

// Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Cuando el usuario haga clic en el botón, desplácese hasta la parte superior del documento
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// evitar cierre modal al hacer click boton submit
$("form").submit(function (event) {
  event.preventDefault();
});

// el boton con el texto aparece oculto y desactivado en el modal y mostrarlo cuando se haga click en el boton enviar (submit), vaciar los input
document.querySelector('#modalContacto').addEventListener('submit', function (event) {
  event.preventDefault();
  if (event.target.checkValidity()) {
    document.querySelector('#btn-oculto-modal').style.display = 'block';
    document.querySelector('#nombre').value = '';
    document.querySelector('#asunto').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#mensaje').value = '';
  }
});
// verifica que si se cierra el modal y se vuelve abrir se oculte el boton del mensaje
document.querySelector('#modalContacto').addEventListener('hidden.bs.modal', function () {
  document.querySelector('#btn-oculto-modal').style.display = 'none';
});
// si selecciona nuevamente un input sin cerrar el modal, el boton con el mensaje se vuelve a ocultar
const inputs = document.querySelectorAll('#nombre, #asunto, #email, #mensaje');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    document.querySelector('#btn-oculto-modal').style.display = 'none';
  });
});