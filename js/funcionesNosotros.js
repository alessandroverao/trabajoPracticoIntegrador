$(document).ready(function () {
  //activar carrusel de imagenes cuando se carga por completo la pagina
  window.addEventListener('load', function () { // evento cuando carga la pagina
    if (window.location.pathname.endsWith('index.html')) { // pregunta en que ventana estoy, endsWith pregunta el final en este caso index.html, en caso contrario startsWith  pregunta por la parte adelante del url
      var miCarrusel = document.querySelector('#carrusel-nosotros');
      var carrusel = new bootstrap.Carousel(miCarrusel); // le da al carrusel la funcion necesaria para cambiar entre imágenes y agregar controles de navegación.
    }
  });
  // boton para subir al top
  // Obtener el boton
  let botonArriba = document.getElementById("btn-ir-arriba"); // boton para ir arriba
  // Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
  window.onscroll = function () {  // cuando vos bajaste 20 px actives el boton 
    funcionScroll(); //llama a la funcion
  };
  function funcionScroll() {
    if (
      document.body.scrollTop > 20 || // propiedad scrollTop 
      document.documentElement.scrollTop > 20 // pregunta si el scroll vertical bajo mas de 20px
    ) {
      botonArriba.style.display = "block"; // se establece para fijar el boton // muestra el boton
    } else {
      botonArriba.style.display = "none"; // en caso contrario (scroll vertical menos de 20px, oculta el boton)
    }
  }
  // Cuando el usuario haga clic en el botón, scroll hasta la parte superior del documento
  botonArriba.addEventListener("click", irArriba);
  function irArriba() { // esta funcion sube a la parte superior
    document.body.scrollTop = 0; // sube al top ("top = 0")
    document.documentElement.scrollTop = 0;   // sube al top ("top = 0")
  }
  // evitar cierre modal al hacer click boton submit
  $("form").submit(function (evento) { // se puede definir el evento utilizando e o event (cualquier nombre se le puede dar al evento)
    evento.preventDefault(); // Evita que la página se recargue
  });
  // el boton con el texto aparece oculto y desactivado en el modal y mostrarlo cuando se haga click en el boton enviar (submit), vaciar los input
  document.querySelector('#modalContacto').addEventListener('submit', function (evento) {   // evento click boton enviar (es un boton tipo submit en el form)
    evento.preventDefault();  // Evita que la página se recargue
    if (evento.target.checkValidity()) {  //si pasa la validacion se muestran todos los campos vacios
      document.querySelector('#btn-oculto-modal').style.display = 'block'; // muestra el boton boton que esta oculto en modal (el que contiene el mensaje)
      document.querySelector('#nombre').value = ''; // vacia el input nombre
      document.querySelector('#asunto').value = ''; // vacia el input asunto
      document.querySelector('#email').value = ''; // vacia el input email
      document.querySelector('#mensaje').value = ''; // vacia el input mensaje
    }
  });
  // verifica que si se cierra el modal y se vuelve abrir se oculte el boton del mensaje
  document.querySelector('#modalContacto').addEventListener('hidden.bs.modal', function () {
    document.querySelector('#btn-oculto-modal').style.display = 'none';// si se cierra el modal y esta el boton activo se oculte
  });
  // si selecciona nuevamente un input sin cerrar el modal, el boton con el mensaje se vuelve a ocultar
  const inputs = document.querySelectorAll('#nombre, #asunto, #email, #mensaje'); // se crea lista de inputs con su id y se le asigna a la variable inputs (DOM)
  inputs.forEach(input => {  //se agrega un controlador de eventos para el evento focus de cada input
    input.addEventListener('focus', () => { //si cualquier input obtiene el evento foco
      document.querySelector('#btn-oculto-modal').style.display = 'none'; //oculta boton con el mensaje
    });
  });
  // input nombre, que la primera letra de cada palabra sea mayuscula jquery
  $('#nombre').on('input', function () { //Cuando el valor del elemento cambia
    $(this).val(
      $(this) //pone la primer letra en mayusculas de #nombre 
        .val()
        .replace(/\b\w/g, function (p) { //reemplaza la primer letra con mayuscula
          return p.toUpperCase();
        })
    );
  });
  // validar input nombre que solo se ingresen letras y espacios y cantidad de letras ingresadas
  let inputNombre = document.querySelector('#nombre');
  let expresionNombre = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(\s[a-zA-ZáéíóúÁÉÍÓÚ]+)*$/; // Agregar letras, letras con acentos y un solo espacio entre palabras
  let minimoLetras = 3;
  let maximoLetras = 100;
  inputNombre.addEventListener('input', function () {
    let palabras = inputNombre.value.trim().split(/\s+/); // La función "trim()" elimina los espacios en blanco al inicio y al final del texto ingresado por el usuario,split(/\s+/) split()" divide el texto en palabras utilizando una expresión, en este caso /\s+/ corta lo que es espacios en blanco
    if (!expresionNombre.test(inputNombre.value)) {   //se verifica si el valor del elemento cumple con la expresion regular utilizando el método test del objeto expresion
      inputNombre.setCustomValidity('Por favor ingrese solo letras y un espacio entre palabras.');
    } else if (palabras.length < 2 || palabras.length > 5) { // se exije que sea porlomenos  2 palabras en ste caso nombre , apellido
      inputNombre.setCustomValidity('Por favor ingrese nombre y apellido.');
    } else if (palabras.some(palabra => palabra.length < minimoLetras)) { // SOME: Se utiliza para verificar si al menos un elemento de la matriz cumple con un criterio especificado
      inputNombre.setCustomValidity(`Cada palabra debe tener al menos ${minimoLetras} caracteres.`);
    } else if (palabras.some(palabra => palabra.length > maximoLetras)) {
      inputNombre.setCustomValidity(`Cada palabra no debe tener más de ${maximoLetras} caracteres.`);
    } else {
      inputNombre.setCustomValidity('');  //setCustomValidity: es un método de los elementos de formulario. Se usa para establecer un mensaje de validación personalizado.
    }
  }); 
  // agrega un controlador de eventos input al campo de asunto y convertirá la primera letra de cada palabra y la primera letra después de un punto en mayúscula
  $('#asunto').on('input', function () {
    $(this).val(
      $(this)
        .val()
        .replace(/(^|\.\s+)\w/g, function (p) { //reemplaza con mayuscula, la primer letra del texto y la primer letra  luego de un punto
          return p.toUpperCase();
        })
    );
  });
  // validar input asunto cantidad de letras ingresadas 
  let inputAsunto = document.querySelector('#asunto');
  inputAsunto.addEventListener('input', function () {
    if (inputAsunto.value.length < minimoLetras) {
      inputAsunto.setCustomValidity(`El asunto debe tener al menos ${minimoLetras} caracteres.`);
    } else if (inputAsunto.value.length > maximoLetras) {
      inputAsunto.setCustomValidity(`El asunto no debe tener más de ${maximoLetras} caracteres.`);
    } else {
      inputAsunto.setCustomValidity('');
    }
  });
  // validar input email - y consumo de api (reqres.in) solo para enviar un dato y recibir una respuesta 
  let inputEmail = document.querySelector('#email');
  let expresionEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//antes del @ minusculas,mayusculas,numeros,despues del @ podes poner min y may o numros y despues del punto solo letra, numeros,
  let dominiosAceptados = [ //array de los @, los dominios aceptados por la validacion
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
    if (!expresionEmail.test(inputEmail.value)) {
      inputEmail.setCustomValidity('Por favor ingresa un correo electrónico válido.'); // si no pasa esta validacion se muestra en "el pseudo elemento" :placeholder 
      $('#email').removeAttr('title'); // se esta validando constantemente mientra se escribe ej n,mb,fuj, entonces se borra hasta que se vuelva a validar y pase esta.
    } else {
      let dominio = inputEmail.value.split('@')[1]; // en este domain se guarda el dominio ej martin@google.com  en  domain quedaria google.com
      //split: lo divide en dos partes utilizando el separador "@", se convierte en una matriz,  se accede al segundo elemento de la matriz (índice 1) y se asigna a la variable dominio.
      if (!dominiosAceptados.includes(dominio)) { // en este if se pregunta que si el dominio no esta incluida dentro del array
        inputEmail.setCustomValidity(`El dominio ${dominio} no está permitido.`);// si no esta incluido en el placeholder se muetra el dominio no esta permitido ej @live.com.ar
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
          error: function () {// console.alert  aprece arriba el mensaje
            console.alert("Error en la solicitud"); // Mostrar un mensaje de error en caso de fallo
          }
        });
      }
    }
  });

  /*  // validar input email - y consumo de api que verifica la existencia del email
    let inputEmail = document.querySelector('#email');
    let expresionEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let dominiosAceptados = [
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
      if (!expresionEmail.test(inputEmail.value)) {
        inputEmail.setCustomValidity('Por favor ingresa un correo electrónico válido.');
      } else {
        let domain = inputEmail.value.split('@')[1];
        if (!dominiosAceptados.includes(domain)) {
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
  let minimoLetrasMensaje = 4;
  let maximoLetrasMensaje = 500;
  let malasPalabras = ['lrpmqtphdrmp', 'river plate', 'river', 'trabajar el fin de semana', 'culo'];// se evitan las malas palabra, se utiliza un array con las malas palabras para que no ingrese en el mensaje 
  inputMensaje.addEventListener('input', function () {
    if (inputMensaje.value.length < minimoLetrasMensaje) {
      inputMensaje.setCustomValidity(`El mensaje debe tener al menos ${minimoLetrasMensaje} caracteres.`);
    } else if (inputMensaje.value.length > maximoLetrasMensaje) {
      inputMensaje.setCustomValidity(`El mensaje no debe tener más de ${maximoLetrasMensaje} caracteres.`);
    } else if (malasPalabras.some(palabra => inputMensaje.value.toLowerCase().includes(palabra))) { //toLowerCase: convierte la cadena en minuscula.
      // convierte palabra en una matriz con el texto del input y busca si una de las palabras en esta se encuentra en malasPabras, con el metodo "some"
      inputMensaje.setCustomValidity('El mensaje contiene palabras o frases inapropiadas o prohibidas.');
    } else {
      inputMensaje.setCustomValidity('');
    }
  });

  // boton modo oscuro - y modo claro
  const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");// se le agrega el atributo data-bs-theme al body con el valor de dark
    //el efecto de cambiar el valor del atributo data-bs-theme en el elemento <body> puede afectar a otros elementos de la página
    document.querySelector("#boton-modo-oscuro").setAttribute("class", "bi bi-sun");// cambia la luna por la sol (icono en el menu)
    localStorage.setItem("tema", "oscuro"); // Guardar el tema en el almacenamiento local
    // Verificar si estamos en la página cotizacion.html
    if (location.pathname.endsWith("cotizacion.html")) { // cuando se activa el modo dark se vambian las imagenes
      // Cambiar las imágenes cotizacion
      document.querySelector(".imagen-izquierda").src = "/recursos/imagenes/lineal-cereza-blanca.png";
      document.querySelector(".imagen-derecha").src = "/recursos/imagenes/lineal-arandano-blanco.png";
    }
    if (location.pathname.endsWith("reclamo.html")) { // cuando se activa el modo dark se vambian las imagenes
      // Cambiar la imágen reclamo
      document.querySelector("#imagen-reclamo").src = "/recursos/imagenes/reclamos_flyer_dark.jpg";
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
    if (location.pathname.endsWith("reclamo.html")) { // cuando se activa el modo claro se vambian las imagenes
      // Cambiar la imágen reclamo
      document.querySelector("#imagen-reclamo").src = "/recursos/imagenes/reclamos_flyer.jpg";
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
  document.addEventListener('click', function (evento) {
    var barraNavegacion = document.querySelector('#navbarNav');
    var clickDentro = barraNavegacion.contains(evento.target);
    if (!clickDentro && barraNavegacion.classList.contains('show')) {
      barraNavegacion.classList.remove('show');
    }
  });

  //agrega un evento de mouseover al elemento li con la clase dropdown. Cuando el mouse está sobre este elemento, se agrega la clase show al menú desplegable para abrirlo.
  var desplegable = document.querySelector('.dropdown');
  var menuDesplegable = desplegable.querySelector('.dropdown-menu');
  
  desplegable.addEventListener('mouseover', function () {
    menuDesplegable.classList.add('show');
  });
  // si se saca el mouse se cierra el dropdown
  desplegable.addEventListener('mouseleave', function () {
    menuDesplegable.classList.remove('show');
  });
});