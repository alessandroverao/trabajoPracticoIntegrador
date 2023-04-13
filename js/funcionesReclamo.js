$(document).ready(function () {
    // al hacer click en text-area el puntero de escribir se posiciona al inicio
    document.getElementById('texto-reclamo').addEventListener('click', function () {
        this.setSelectionRange(0, 0);
    });
    var constraints = {
        "nombre-reclamo": {
            presence: { message: "requerido" },
            length: { minimum: 3, message: "debe tener al menos 3 caracteres" },
            format: {
                pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "solo puede contener letras y espacios"
            }
        },
        "apellido-reclamo": {
            presence: { message: "requerido" },
            length: { minimum: 3, message: "debe tener al menos 3 caracteres" },
            format: {
                pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "solo puede contener letras y espacios"
            }
        },
        "email-reclamo": {
            presence: { message: "requerido" },
            email: { message: "no es válido" }
        },
        "telefono-reclamo": {
            presence: { message: "requerido" },
            numericality: { onlyInteger: true, message: "Ingrese solamente números" },
            length: { minimum: 8, message: "debe tener al menos 8 caracteres" }
        },
        "compra-reclamo": {
            presence: { message: "requerido" },
            numericality: { onlyInteger: true, message: "debe ser un número entero" }
        }
    };

    document.querySelector("#form-reclamo").addEventListener("submit", function (event) {
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
        document.querySelectorAll("input").forEach(function (element) {
            element.classList.remove("is-invalid");
        });
        for (var key in errors) {
            var errorElement = document.querySelector("#" + key);
            errorElement.classList.add("is-invalid");
            var message = errors[key][0];
            errorElement.nextElementSibling.textContent = message;
        }
    }

    function showSuccess() {
        document.querySelectorAll("input").forEach(function (element) {
            element.classList.remove("is-invalid"); //elimina los mensajes de errores
            element.value = ""; // vacia los campos input
        });
        document.querySelector("#success-message").textContent = "¡Reclamo enviado con éxito!";
    }

});