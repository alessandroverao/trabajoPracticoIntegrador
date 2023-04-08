// input producto cambiar imagen icon segun lo seleccionado 
// Oculta inicialmente ambas imágenes
document.getElementById("cereza-icon").style.display = "none";
document.getElementById("arandano-icon").style.display = "none";

// Función que se ejecuta cuando el usuario cambia la opción seleccionada
function updateProductIcon() {
    // Obtiene el valor de la opción seleccionada
    var selectedProduct = document.getElementById("select-producto").value;

    // Muestra la imagen correspondiente y oculta la otra
    if (selectedProduct === "cereza") {
        document.getElementById("cereza-icon").style.display = "inline";
        document.getElementById("arandano-icon").style.display = "none";
        document.getElementById("frutafina-icon").style.display = "none";
    } else if (selectedProduct === "arandano") {
        document.getElementById("cereza-icon").style.display = "none";
        document.getElementById("frutafina-icon").style.display = "none";
        document.getElementById("arandano-icon").style.display = "inline";
    }
}
// generar variedades apartir del producto seleccionado 
const selectProducto = document.querySelector('#select-producto');
const selectVariedad = document.querySelector('#select-variedad');
const variedades = {
    arandano: ['Duke', 'Draper', 'Blue Ribbon', 'Blue Crop', 'Liberty', 'Blue Gold', 'Top Shelf', 'Aurora',
        'Last Call', 'New Hanover', 'Alixblue', 'Gupton', 'Ozarkblue®', 'Star', 'Colibrí'],
    cereza: ['Santina', 'Van', 'Bing', 'Stella', 'Lapins', 'Kordia', 'Regina', 'Sweet Heart', 'Burlat',
        'Marvin', 'Royal Tioga', 'Pacific Red', 'Ruby', 'Early Red', 'Royal Bailey', 'Royal Hazel', 'Rocket', 'Carmen', 'Frisco', 'Brocks']
};
selectProducto.addEventListener('change', (event) => {
    const productoSeleccionado = event.target.value;
    const opcionesVariedad = variedades[productoSeleccionado];
    // Limpiar las opciones anteriores
    selectVariedad.innerHTML = '<option selected disabled>Seleccione un tipo de variedad</option>';
    // Ordenar alfabéticamente las opciones
    opcionesVariedad.sort();
    // Agregar nuevas opciones
    opcionesVariedad.forEach((variedad) => {
        const option = document.createElement('option');
        option.value = variedad;
        option.textContent = variedad;
        selectVariedad.appendChild(option);
    });
});
// agregar un precio a cada variedad de cereza y de arandano
const preciosCereza = {
    'Santina': 639,
    'Van': 543,
    'Bing': 927,
    'Stella': 803,
    'Lapins': 919,
    'Kordia': 535,
    'Regina': 438,
    'Sweet Heart': 401,
    'Burlat': 050,
    'Marvin': 622,
    'Royal Tioga': 852,
    'Pacific Red': 422,
    'Ruby': 759,
    'Early Red': 705,
    'Royal Bailey': 677,
    'Royal Hazel': 370,
    'Rocket': 581,
    'Carmen': 477,
    'Frisco': 648,
    'Brocks': 693
};
const preciosArandano = {
    'Duke': 391,
    'Draper': 357,
    'Blue Ribbon': 308,
    'Blue Crop': 789,
    'Liberty': 091,
    'Blue Gold': 567,
    'Top Shelf': 690,
    'Aurora': 487,
    'Last Call': 898,
    'New Hanover': 888,
    'Alixblue': 453,
    'Gupton': 822,
    'Ozarkblue®': 393,
    'Star': 197,
    'Colibrí': 981
};
// generar tipo de caja apartir del producto selecionado
const selectTipoCaja = document.querySelector('#select-tipo-caja');
const tiposCaja = {
    arandano: ['2,5kg', '5kg', '7,5kg'],
    cereza: ['2,5kg - Tapa Blanca', '2,5kg - Tapa Roja', '2,5kg - Tapa Marrón', '5kg - Tapa Blanca', '5kg - Tapa Roja', '5kg - Tapa Marrón']
};
selectProducto.addEventListener('change', () => {
    const productoSeleccionado = selectProducto.value;
    const opcionesTipoCaja = tiposCaja[productoSeleccionado];
    // Limpiar las opciones anteriores
    selectTipoCaja.innerHTML = '<option selected disabled>Seleccione un tipo de caja</option>';
    // Agregar nuevas opciones
    opcionesTipoCaja.forEach((tipoCaja) => {
        const option = document.createElement('option');
        option.value = tipoCaja;
        option.textContent = tipoCaja;
        selectTipoCaja.appendChild(option);
    });
});
// agregar un precio a cada tipo de caja
const preciosCajaArandano = {
    '2,5kg': 38,
    '5kg': 51.25,
    '7,5kg': 75
};
const preciosCajaCereza = {
    '2,5kg - Tapa Blanca': 5,
    '2,5kg - Tapa Roja': 3.29,
    '2,5kg - Tapa Marrón': 10,
    '5kg - Tapa Blanca': 15,
    '5kg - Tapa Roja': 18,
    '5kg - Tapa Marrón': 9.47
};
// agregar kg a cada tipo de caja
const kgCajaArandano = {
    '2,5kg': 2.5,
    '5kg': 5,
    '7,5kg': 7.5
};
const kgCajaCereza = {
    '2,5kg - Tapa Blanca': 2.5,
    '2,5kg - Tapa Roja': 2.5,
    '2,5kg - Tapa Marrón': 2.5,
    '5kg - Tapa Blanca': 5,
    '5kg - Tapa Roja': 5,
    '5kg - Tapa Marrón': 5
};
//validacion de input number al ingresar un valor
const inputCantidadCajas = document.querySelector('#cantidad-cajas');
const errorMessage = document.querySelector('#error-message');
// Agrega un controlador de eventos para el evento keydown
inputCantidadCajas.addEventListener('keydown', (event) => {
    // Verifica si la tecla presionada es un punto o una coma
    if (event.key === '.' || event.key === ',') {
        // Cancela el evento para evitar que se ingrese el punto o la coma
        event.preventDefault();
    }
});
inputCantidadCajas.addEventListener('input', () => {
    let value = inputCantidadCajas.value;
    if (value === '' || !Number.isInteger(Number(value)) || Number(value) <= 0) {
        // El valor ingresado no es válido
        // Mostrar un mensaje de error al usuario
        errorMessage.textContent = 'El valor debe ser un número entero mayor a 0';
        errorMessage.style.display = 'block';
    } else {
        // El valor ingresado es válido
        // Ocultar el mensaje de error
        errorMessage.style.display = 'none';
    }
});
// validacion de campos completos y habilitar botones
document.querySelector('.btn-success').addEventListener('click', function () {
    let producto = document.querySelector('#select-producto').value;
    let variedad = document.querySelector('#select-variedad').value;
    let tipoCaja = document.querySelector('#select-tipo-caja').value;
    let cantidadCajas = document.querySelector('#cantidad-cajas').value;

    let totalProducto = 0;
    let totalCajas = 0;
    let totalKg = 0;
    let total = 0;

    if (producto !== "Seleccione un producto" && variedad !== "Seleccione un tipo de variedad" && tipoCaja !== "Seleccione un tipo de caja"
        && cantidadCajas !== "" && Number.isInteger(Number(cantidadCajas)) && Number(cantidadCajas) > 0) {
        document.querySelector('.btn-danger').style.display = 'inline';
        document.querySelector('.btn-primary').style.display = 'inline';
        document.querySelectorAll('input:not(.btn-danger, .btn-primary):not(#modalContacto input), select:not(#modalContacto select)').forEach(function (el) {
            el.disabled = true;
            el.classList.remove('input-error');
        });
        this.disabled = true;
        document.querySelector('#error-message').style.display = 'none';
        // Actualiza el contenido del elemento de resumen
        // Convierte el valor a un número
        let cantidadCajasParaMostrar = Number(cantidadCajas);

        if (producto === 'cereza') {
            totalKg = kgCajaCereza[tipoCaja] * cantidadCajas;
            totalProducto = preciosCereza[variedad] * totalKg;
            totalCajas = preciosCajaCereza[tipoCaja] * cantidadCajas;
            total = totalProducto + totalCajas;

            document.getElementById("resumen").innerHTML = `El precio por kg de la variedad ${variedad} de ${producto}s es $${preciosCereza[variedad]} 
            y el tipo de caja es "${tipoCaja}", su precio por unidad es $${preciosCajaCereza[tipoCaja]}, fueron elegidas ${cantidadCajasParaMostrar.toLocaleString('de-DE')} caja/s. <br>
            Total kg: ${totalKg.toLocaleString('de-DE')} <br>
            Total Producto: $${totalProducto.toLocaleString('de-DE')} <br>
            Total Cajas: $${totalCajas.toLocaleString('de-DE')} <br>
            Total a Pagar: $${total.toLocaleString('de-DE')}`;

        } else if (producto === 'arandano') {
            totalKg = kgCajaArandano[tipoCaja] * cantidadCajas;
            totalProducto = preciosArandano[variedad] * totalKg;
            totalCajas = preciosCajaArandano[tipoCaja] * cantidadCajas;
            total = totalProducto + totalCajas;

            document.getElementById("resumen").innerHTML = `El precio por kg de la variedad ${variedad} de ${producto}s es $${preciosArandano[variedad]} 
            y el tipo de caja es ${tipoCaja}, su precio por unidad es $${preciosCajaArandano[tipoCaja]}, fueron elegidas ${cantidadCajasParaMostrar.toLocaleString('de-DE')} caja/s. <br>
            Total kg: ${totalKg.toLocaleString('de-DE')} <br>
            Total Producto: $${totalProducto.toLocaleString('de-DE')} <br>
            Total Cajas: $${totalCajas.toLocaleString('de-DE')} <br>
            Total a Pagar: $${total.toLocaleString('de-DE')}`;

        }

    } else {
        document.querySelector('#error-message').textContent = 'Por favor complete todos los campos';
        document.querySelector('#error-message').style.display = 'block';
        // Agregar la clase "highlight" al elemento "#error-message"
        errorMessage.classList.add('highlight');
        // Eliminar la clase "highlight" después de unos segundos
        setTimeout(() => {
            errorMessage.classList.remove('highlight');
        }, 1000);
        // Agregar la clase "input-error" a los elementos de entrada que no se han completado correctamente
        if (producto === "Seleccione un producto") {
            document.querySelector('#select-producto').classList.add('input-error');
        }
        if (variedad === "Seleccione un tipo de variedad") {
            document.querySelector('#select-variedad').classList.add('input-error');
        }
        if (tipoCaja === "Seleccione un tipo de caja") {
            document.querySelector('#select-tipo-caja').classList.add('input-error');
        }
        if (cantidadCajas === "" || !Number.isInteger(Number(cantidadCajas)) || Number(cantidadCajas) <= 0) {
            document.querySelector('#cantidad-cajas').classList.add('input-error');
        }
    }
});
// Agregar un controlador de eventos al nuevo botón "Nueva cotización"
document.querySelector('.btn-primary').addEventListener('click', function () {
    // Desbloquear los campos de entrada y selección
    document.querySelectorAll('input:not(.btn-danger, .btn-primary):not(#modalContacto input), select:not(#modalContacto select)').forEach(function (el) {
        el.disabled = false;
        el.classList.remove('input-error');
    });
    // Mostrar los botones ocultos
    document.querySelector('.btn-success').style.display = 'inline';
    // Ocultar el botón "Nueva cotización"
    this.style.display = 'none';
    // Ocultar el botón "btn-danger"
    document.querySelector('.btn-danger').style.display = 'none';
});
//controlar el input si ya fue seleccionado un item luego del error al presionar el boton
document.querySelectorAll('input:not(.btn-danger, .btn-primary):not(#modalContacto input), select:not(#modalContacto select)').forEach(function (el) {
    el.addEventListener('input', function () {
        // Verificar si el contenido del elemento de entrada es válido
        if (this.value !== "") {
            // Eliminar la clase "input-error" del elemento
            this.classList.remove('input-error');
        }
    });
});
// evento que vacia los input del form en el caso que se avance una pagina o si se retrocede una pagina y vuelva a la misma luego.
window.addEventListener('beforeunload', function (event) {
    // Limpiar el contenido del formulario
    document.querySelectorAll('input, select').forEach(function (el) {
        el.value = '';
    });
});


