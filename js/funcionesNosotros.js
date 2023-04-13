$(document).ready(function () {
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
  // Cuando el usuario haga clic en el botón, scroll hasta la parte superior del documento
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
  // input nombre que la primera letra de cada palabra sea mayuscula jquery
  $('#nombre').on('input', function () {
    $(this).val(
      $(this)
        .val()
        .replace(/\b\w/g, function (l) {
          return l.toUpperCase();
        })
    );
  });
  // validar input nombre que solo se ingresen letras y espacios y cantidad de letras ingresadas
  let inputNombre = document.querySelector('#nombre');
  let regex = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(\s[a-zA-ZáéíóúÁÉÍÓÚ]+)*$/; // Agregar letras, letras con acentos y un solo espacio entre palabras
  let minLength = 3;
  let maxLength = 100;
  inputNombre.addEventListener('input', function () {
    let words = inputNombre.value.trim().split(/\s+/);
    if (!regex.test(inputNombre.value)) {
      inputNombre.setCustomValidity('Por favor ingrese solo letras y un espacio entre palabras.');
    } else if (words.length < 2 || words.length > 5) {
      inputNombre.setCustomValidity('Por favor ingrese nombre y apellido.');
    } else if (words.some(word => word.length < minLength)) {
      inputNombre.setCustomValidity(`Cada palabra debe tener al menos ${minLength} caracteres.`);
    } else if (words.some(word => word.length > maxLength)) {
      inputNombre.setCustomValidity(`Cada palabra no debe tener más de ${maxLength} caracteres.`);
    } else {
      inputNombre.setCustomValidity('');
    }
  });
  // agrega un controlador de eventos input al campo de asunto y convertirá la primera letra de cada palabra y la primera letra después de un punto en mayúscula
  $('#asunto').on('input', function () {
    $(this).val(
      $(this)
        .val()
        .replace(/(^|\.\s+)\w/g, function (l) {
          return l.toUpperCase();
        })
    );
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
  let apiKey = 'fdac890a56950b1b05045bb709b8623e4cd8ce30'; // código key de mi cuenta creada en hunter
  inputEmail.addEventListener('input', function () {
    if (!regexDos.test(inputEmail.value)) {
      inputEmail.setCustomValidity('Por favor ingresa un correo electrónico válido.');
    } else {
      let domain = inputEmail.value.split('@')[1];
      if (!allowedDomains.includes(domain)) {
        inputEmail.setCustomValidity(`El dominio ${domain} no está permitido.`);
      } else {
        $.ajax({
          url: `https://api.hunter.io/v2/email-verifier?email=${inputEmail.value}&api_key=${apiKey}`,
          success: function (data) {
            // Procesar los datos recibidos de la API
            if (data.data.status === 'invalid') {
              inputEmail.setCustomValidity('El correo electrónico no es válido o no existe.');
            } else {
              inputEmail.setCustomValidity('');
            }
          }
        });
      }
    }
  });
  // agrega un controlador de eventos input al campo de mensaje y convertirá la primera letra de cada palabra y la primera letra después de un punto en mayúscula
  $('#mensaje').on('input', function () {
    $(this).val(
      $(this)
        .val()
        .replace(/(^|\.\s+)\w/g, function (l) {
          return l.toUpperCase();
        })
    );
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

  // boton modo oscuro - y modo claro
  const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#boton-modo-oscuro").setAttribute("class", "bi bi-sun");
    localStorage.setItem("tema", "oscuro"); // Guardar el tema en el almacenamiento local
    // Verificar si estamos en la página cotizacion.html
    if (location.pathname.endsWith("cotizacion.html")) {
      // Cambiar las imágenes cotizacion
      document.querySelector(".imagen-izquierda").src = "/recursos/imagenes/lineal-cereza-blanca.png";
      document.querySelector(".imagen-derecha").src = "/recursos/imagenes/lineal-arandano-blanco.png";
    }
  }
  const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#boton-modo-oscuro").setAttribute("class", "bi bi-moon-stars");
    localStorage.setItem("tema", "claro"); // Guardar el tema en el almacenamiento local
    // Verificar si estamos en la página cotizacion.html
    if (location.pathname.endsWith("cotizacion.html")) {
      // Cambiar las imágenes
      document.querySelector(".imagen-izquierda").src = "/recursos/imagenes/lineal-cereza.png";
      document.querySelector(".imagen-derecha").src = "/recursos/imagenes/lineal-arandano.png";
    }
  }
  const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light" ?
      temaOscuro() : temaClaro();
  }
  // Agregar controlador de eventos para el evento click en el elemento a del menu (modo oscuro)
  document.querySelector(".nav-link[title='Modo oscuro']").addEventListener("click", cambiarTema);

  // Verificar el valor inicial del atributo data-bs-theme y el valor guardado en el almacenamiento local
  if (localStorage.getItem("tema") === "oscuro") {
    temaOscuro();
  } else {
    temaClaro();
  }

  // agrega evento al boton del menu (cuando es pantalla pequeña) para que se enrrolle el menu cuando toco la pantalla fuera del menu
  document.addEventListener('click', function (event) {
    var navbar = document.querySelector('#navbarNav');
    var isClickInside = navbar.contains(event.target);
    if (!isClickInside && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  });

  //agrega un evento de mouseover al elemento li con la clase dropdown. Cuando el mouse está sobre este elemento, se agrega la clase show al menú desplegable para abrirlo.
  var dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('mouseover', function (event) {
    var dropdownMenu = this.querySelector('.dropdown-menu');
    dropdownMenu.classList.add('show');
  });

  //agrega un evento de mouseout al elemento li con la clase dropdown. Cuando el mouse ya no está sobre este elemento, se elimina la clase show del menú desplegable para cerrarlo.
  var dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('mouseout', function (event) {
    var dropdownMenu = this.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
  });
});