$(document).ready(function () {
  //activar carrusel de imagenes cuando se carga por completo la pagina
  window.addEventListener('load', function () {
    if (window.location.pathname.endsWith('index.html')) { // pregunta en que ventana estoy, endsWith pregunta el final en este caso index.html, en caso contrario starWith  pregunta por la parte adelante del url
      var myCarousel = document.querySelector('#carouselExampleSlidesOnly');
      var carousel = new bootstrap.Carousel(myCarousel); // son la imagenes de  las cerezas y arandanos , en este carrusel se ejecuta si estas en la ventana de nosotros
    }// sino consume mas ram porque sigue funcionando a pesar que cambies de paginas
  });
  // boton para subir al top
  // Obtener el boton
  let mybutton = document.getElementById("btn-back-to-top"); // boton para ir arriba
  // Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
  window.onscroll = function () {  // cuando vos bajaste 20 px actives el boton 
    scrollFunction();
  };
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 || // propiedad scrollTop
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block"; // se establece para fijar el boton
    } else {
      mybutton.style.display = "none";
    }
  }
  // Cuando el usuario haga clic en el botón, scroll hasta la parte superior del documento
  mybutton.addEventListener("click", backToTop);
  function backToTop() { // esta funcion sube a la parte superior
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // evitar cierre modal al hacer click boton submit
  $("form").submit(function (event) { // se puede definir el evento utilizando e o event
    event.preventDefault(); // Evita que la página se recargue
  });
  // el boton con el texto aparece oculto y desactivado en el modal y mostrarlo cuando se haga click en el boton enviar (submit), vaciar los input
  document.querySelector('#modalContacto').addEventListener('submit', function (event) { 
    event.preventDefault();
    if (event.target.checkValidity()) {  //si pasa la validacion se muestra el modal y todos los campos entran en vacio
      document.querySelector('#btn-oculto-modal').style.display = 'block';
      document.querySelector('#nombre').value = '';
      document.querySelector('#asunto').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#mensaje').value = '';
    }
  });
  // verifica que si se cierra el modal y se vuelve abrir se oculte el boton del mensaje
  document.querySelector('#modalContacto').addEventListener('hidden.bs.modal', function () {
    document.querySelector('#btn-oculto-modal').style.display = 'none';// si se cierra el modal y esta el boton activo se oculte
  });
  // si selecciona nuevamente un input sin cerrar el modal, el boton con el mensaje se vuelve a ocultar
  const inputs = document.querySelectorAll('#nombre, #asunto, #email, #mensaje');
  inputs.forEach(input => {
    input.addEventListener('focus', () => { 
      document.querySelector('#btn-oculto-modal').style.display = 'none'; //oculta boton
    });
  });
  // input nombre que la primera letra de cada palabra sea mayuscula jquery
  $('#nombre').on('input', function () {
    $(this).val(
      $(this) //pone la primer letra en mayusculas de #nombre o input-nombre
        .val()
        .replace(/\b\w/g, function (l)  { //reemplaza la misma letra pero con mayusculas
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
    let words = inputNombre.value.trim().split(/\s+/); // La función "trim()" elimina los espacios en blanco al inicio y al final del texto ingresado por el usuario,split(/\s+/) split()" divide el texto en palabras utilizando una expresión, en este caso /\s+/ corta lo que es salto de linea, tabulacion y espacios
    if (!regex.test(inputNombre.value)) {
      inputNombre.setCustomValidity('Por favor ingrese solo letras y un espacio entre palabras.');
    } else if (words.length < 2 || words.length > 5) { // se exije que sea porlomenos  2 palabras en ste caso nombre , apellido
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
  // validar input email - y consumo de api (reqres.in) solo para enviar un dato y recibir una respuesta 
  let inputEmail = document.querySelector('#email');
  let regexDos = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//antes del @ minusculas,mayusculas,numeros,despues del @ podes poner min y may o numros y despues del punto solo letra, numeros,
  let allowedDomains = [ //array de los @, los dominios
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
  inputEmail.addEventListener('input', function () {
    inputEmail.setCustomValidity(''); // se establece cuando el mouse este sobre el imput email este vacia, con el setCustomValidity muestra la caja, se le puede pasar un valor, string
    if (!regexDos.test(inputEmail.value)) { 
      inputEmail.setCustomValidity('Por favor ingresa un correo electrónico válido.'); // si no pasa esta validacion se muestra en "el pseudo elemento" :placeholder de scss
      $('#email').removeAttr('title'); // se esta validando constantemente mientra se escribe ej n,mb,fuj, entonces se borra hasta que se vuelva a validar 
    } else {
      let domain = inputEmail.value.split('@')[1]; // en este domain se guarda el dominio ej martin@google.com  en  domain quedaria google.com
      if (!allowedDomains.includes(domain)) { // en este if se pregunta que si el domain no esta incluida dentro de array
        inputEmail.setCustomValidity(`El dominio ${domain} no está permitido.`);// si no esta incluido en el placeholder se muetra el dominio no esta permitido ej @live.com.ar
        $('#email').removeAttr('title');
      } else {
        $.ajax({
          url: "https://reqres.in/api/users",
          type: "POST",
          data: {
            email: `${inputEmail.value}`
          },//en data se guarda el resultado que te devuelve el servidor 

          success: function (data) {
            console.log(data); // 
            $('#email').attr('title', 'El correo ' + data.email + ' está permitido.'); // Mostrar la respuesta en elemento HTML en el TITLE del Input EMAIL
          },
          error: function () {// console.error  aprece arriba
            console.error("Error en la solicitud"); // Mostrar un mensaje de error en caso de fallo
          }
        });
      }
    }
  });

/*  // validar input email - y consumo de api que verifica la existencia del email
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
  }); */


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
  let malasPalabras = ['lrpmqtphdrmp', 'river plate', 'river', 'trabajar el fin de semana', 'culo'];// se evitan las malas palabra, se utiliza un array con las malas palabras para que no ingrese en el mensaje 
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
    document.querySelector("body").setAttribute("data-bs-theme", "dark");// se le agrega el atributo data-bs-theme y dark
    document.querySelector("#boton-modo-oscuro").setAttribute("class", "bi bi-sun");// cambia la luna por la sol
    localStorage.setItem("tema", "oscuro"); // Guardar el tema en el almacenamiento local
    // Verificar si estamos en la página cotizacion.html
    if (location.pathname.endsWith("cotizacion.html")) { // cuando se activa el modo dark se vambian las imagenes
      // Cambiar las imágenes cotizacion
      document.querySelector(".imagen-izquierda").src = "/recursos/imagenes/lineal-cereza-blanca.png";
      document.querySelector(".imagen-derecha").src = "/recursos/imagenes/lineal-arandano-blanco.png";
    }
  }
  const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#boton-modo-oscuro").setAttribute("class", "bi bi-moon-stars");
    localStorage.setItem("tema", "claro"); // Guardar el tema en el almacenamiento local en el cache del navegador
    // Verificar si estamos en la página cotizacion.html
    if (location.pathname.endsWith("cotizacion.html")) {
      // Cambiar las imágenes
      document.querySelector(".imagen-izquierda").src = "/recursos/imagenes/lineal-cereza.png";
      document.querySelector(".imagen-derecha").src = "/recursos/imagenes/lineal-arandano.png";
    }
  }
  const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light" ?//el método "getAttribute()" se utiliza para obtener el valor del atributo "data-bs-theme" del elemento "body" del documento HTML. Si el valor es "light", se llama a la función "temaOscuro()", de lo contrario, se llama a la función "temaClaro()".
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