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
// validar input nombre que solo se ingresen letras y espacios y cantidad de letras ingresadas
let inputNombre = document.querySelector('#nombre');
let regex = /^[a-zA-Z\s]*$/;
let minLength = 5;
let maxLength = 100;

inputNombre.addEventListener('input', function () {
  let words = inputNombre.value.trim().split(/\s+/);
  if (!regex.test(inputNombre.value)) {
    inputNombre.setCustomValidity('Por favor ingresa solo letras y espacios.');
  } else if (words.length !== 2) {
    inputNombre.setCustomValidity('Por favor ingresa nombre y apellido.');
  } else if (words.some(word => word.length < minLength)) {
    inputNombre.setCustomValidity(`Cada palabra debe tener al menos ${minLength} caracteres.`);
  } else if (words.some(word => word.length > maxLength)) {
    inputNombre.setCustomValidity(`Cada palabra no debe tener más de ${maxLength} caracteres.`);
  } else {
    inputNombre.setCustomValidity('');
  }
});
// validar input asunto cantidad de letras ingresadas 
let inputAsunto = document.querySelector('#asunto');
inputAsunto.addEventListener('input', function () {
  if (inputAsunto.value.length < minLength) {
    inputAsunto.setCustomValidity(`El asunto debe tener al menos ${minLength} caracteres.`);
  } else if (inputAsunto.value.length > maxLength) {
    inputAsunto.setCustomValidity(`El asunto no debe tener más de ${maxLength} caracteres.`);
  } else {
    inputAsunto.setCustomValidity('');
  }
});
// validar input email - y consumo de api que verifica la existencia del email
let inputEmail = document.querySelector('#email');
let regexDos = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let allowedDomains = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'msn.com',
  'live.com',
  'yandex.com',
  'protonmail.com'
];
let apiKey = 'fdac890a56950b1b05045bb709b8623e4cd8ce30'; /// codigo key de mi cuenta creada en hunter
inputEmail.addEventListener('input', function () {
  if (!regexDos.test(inputEmail.value)) {
    inputEmail.setCustomValidity('Por favor ingresa un correo electrónico válido.');
  } else {
    let domain = inputEmail.value.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      inputEmail.setCustomValidity(`El dominio ${domain} no está permitido.`);
    } else {
      fetch(`https://api.hunter.io/v2/email-verifier?email=${inputEmail.value}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Procesar los datos recibidos de la API
          if (data.data.status === 'invalid') {
            inputEmail.setCustomValidity('El correo electrónico no es válido o no existe.');
          } else {
            inputEmail.setCustomValidity('');
          }
        });
    }
  }
});
// validar input mensaje - validacion min y maximo de caracteres
inputMensaje = document.querySelector('#mensaje');
let minLengthDos = 4;
let maxLengthDos = 500;
let malasPalabras = ['lrpmqtphdrmp', 'river plate', 'river', 'trabajar el fin de semana', 'culo'];

inputMensaje.addEventListener('input', function () {
  if (inputMensaje.value.length < minLengthDos) {
    inputMensaje.setCustomValidity(`El mensaje debe tener al menos ${minLengthDos} caracteres.`);
  } else if (inputMensaje.value.length > maxLengthDos) {
    inputMensaje.setCustomValidity(`El mensaje no debe tener más de ${maxLengthDos} caracteres.`);
  } else if (malasPalabras.some(word => inputMensaje.value.toLowerCase().includes(word))) {
    inputMensaje.setCustomValidity('El mensaje contiene palabras o frases inapropiadas o prohibidas.');
  } else {
    inputMensaje.setCustomValidity('');
  }
});
