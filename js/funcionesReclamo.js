$(document).ready(function () {
    // al hacer click en text-area el puntero de escribir se posiciona al inicio
    document.getElementById('texto-reclamo').addEventListener('click', function () {
        this.setSelectionRange(0, 0);
    });
    // validacion formulario reclamo, siempre se hace la validacion al hacer click en el boton submit o cuando se da un enter en un input
    var constraints = {  // sintaxis de validate.js
        "nombre-reclamo": {
            presence: { message: "Requerido" },
            length: { minimum: 3, message: "Debe tener al menos 3 caracteres" },
            format: {
                pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "Solo puede contener letras y espacios"
            }
        },
        "apellido-reclamo": {
            presence: { message: "Requerido" },
            length: { minimum: 3, message: "Debe tener al menos 3 caracteres" },
            format: {
                pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "Solo puede contener letras y espacios"
            }
        },
        "email-reclamo": {
            presence: { message: "Requerido" },
            email: { message: "No es válido" }
        },
        "telefono-reclamo": {
            presence: { message: "Requerido" },
            numericality: { onlyInteger: true, message: "Ingrese solamente números" },
            length: { minimum: 8, message: "Debe tener al menos 8 caracteres" }
        },
        "compra-reclamo": {
            presence: { message: "Requerido" },
            numericality: { onlyInteger: true, message: "Debe ser un número entero" }
        }
    };

    $("#form-reclamo").submit(function (event) { //se selecciona form-reclamo// 
        event.preventDefault(); //con el event o evento se detiene las funciones normales o predefinidas en este caso para que no se envie el formulario  
        var values = validate.collectFormValues(event.target); //validate.collectFormValues(event.target) recopila los valores del formulario en un objeto
        var errors = validate(values, constraints); // validate contiene values "que son los datos del formulario", constraints "son lo que definimos anteriormente, las reglas a aplicar"
        if (errors) { // si se cumple este if se llama a la funcion errors
            showErrors(errors);
        } else {
            showSuccess(); // se llama a showSuccess 
        }
    });

    function showErrors(errors) {
        $("input").removeClass("is-invalid");//Se limina la clase "is-invalid"
        for (var key in errors) { //se recorre error con un for in donde la variable key se establece como el nombre de una propiedad de errors, es decir, el nombre de un campo del formulario que ha fallado en la validación.
            var errorElement = $("#" + key); // si key es "nombre-reclamo", entonces la expresión "#" + key será "#nombre-reclamo", que se utiliza para seleccionar el elemento del DOM con id="nombre-reclamo"
            errorElement.addClass("is-invalid");//si el lemento  presenta error entonces se añade la clase "is-invalid"
            var message = errors[key][0]; //si errors tiene la propiedad "nombre-reclamo" con un array que contiene el mensaje "Requerido", entonces errors["nombre-reclamo"][0] será igual a "Requerido", y message tomará ese valor en la línea mencionada.
            message = message.replace(/nombre reclamo|apellido reclamo|email reclamo|telefono reclamo|compra reclamo/gi, ""); //  ("nombre reclamo", "apellido reclamo", etc.) y los reemplaza por una cadena vacía (""), eliminando así los nombres de los campos del mensaje de error
            errorElement.next().text(message);errorElement.next() //se refiere al elemento HTML que sigue inmediatamente después del elemento errorElement, con el text establece el mensaje de error message
        }
    }

    function showSuccess() {
        $("input").removeClass("is-invalid").val(""); // elimina todos los "is-invalid" a todos los input 
        $("textarea").val("");//limpia el texarea 
        $("#success-message").text("¡Reclamo enviado con éxito!");//con el text pone un mensaje de "Reclamo enviado con exito"
    }

});