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

    $("#form-reclamo").submit(function (event) {
        event.preventDefault();
        var values = validate.collectFormValues(event.target);
        var errors = validate(values, constraints);
        if (errors) {
            showErrors(errors);
        } else {
            showSuccess();
        }
    });

    function showErrors(errors) {
        $("input").removeClass("is-invalid");
        for (var key in errors) {
            var errorElement = $("#" + key);
            errorElement.addClass("is-invalid");
            var message = errors[key][0];
            message = message.replace(/nombre reclamo|apellido reclamo|email reclamo|telefono reclamo|compra reclamo/gi, "");
            errorElement.next().text(message);
        }
    }

    function showSuccess() {
        $("input").removeClass("is-invalid").val("");
        $("#success-message").text("¡Reclamo enviado con éxito!");
    }

});