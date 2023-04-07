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
    'Santina': 1639,
    'Van': 1543,
    'Bing': 1927,
    'Stella': 1803,
    'Lapins': 1919,
    'Kordia': 1535,
    'Regina': 1438,
    'Sweet Heart': 1401,
    'Burlat': 1050,
    'Marvin': 1622,
    'Royal Tioga': 1852,
    'Pacific Red': 1422,
    'Ruby': 1759,
    'Early Red': 1705,
    'Royal Bailey': 1677,
    'Royal Hazel': 1370,
    'Rocket': 1581,
    'Carmen': 1477,
    'Frisco': 1648,
    'Brocks': 1693
};
const preciosArandano = {
    'Duke': 1391,
    'Draper': 1357,
    'Blue Ribbon': 1308,
    'Blue Crop': 1789,
    'Liberty': 1091,
    'Blue Gold': 1567,
    'Top Shelf': 1690,
    'Aurora': 1487,
    'Last Call': 1898,
    'New Hanover': 1888,
    'Alixblue': 1453,
    'Gupton': 1822,
    'Ozarkblue®': 1393,
    'Star': 1197,
    'Colibrí': 1981
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
    '2,5kg': 358,
    '5kg': 501.25,
    '7,5kg': 753
};
const preciosCajaCereza = {
    '2,5kg - Tapa Blanca': 350,
    '2,5kg - Tapa Roja': 353.29,
    '2,5kg - Tapa Marrón': 310,
    '5kg - Tapa Blanca': 515,
    '5kg - Tapa Roja': 518,
    '5kg - Tapa Marrón': 499.47
};
//validacion de input number al ingresar un valor
const inputCantidadCajas = document.querySelector('#cantidad-cajas');
const errorMessage = document.querySelector('#error-message');
inputCantidadCajas.addEventListener('input', () => {
    const value = inputCantidadCajas.value;
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
    if (producto !== "Seleccione un producto" && variedad !== "Seleccione un tipo de variedad" && tipoCaja !== "Seleccione un tipo de caja"
        && cantidadCajas !== "" && Number.isInteger(Number(cantidadCajas)) && Number(cantidadCajas) > 0) {
        document.querySelector('.btn-danger').style.display = 'inline';
        document.querySelector('.btn-primary').style.display = 'inline';
        document.querySelectorAll('input:not(.btn-danger, .btn-primary):not(#modalContacto input), select:not(#modalContacto select)').forEach(function (el) {
            el.disabled = true;
        });
        this.disabled = true;
        document.querySelector('#error-message').style.display = 'none';
    } else {
        document.querySelector('#error-message').textContent = 'Por favor complete todos los campos';
        document.querySelector('#error-message').style.display = 'block';
        // Agregar la clase "highlight" al elemento "#error-message"
        errorMessage.classList.add('highlight');
        // Eliminar la clase "highlight" después de unos segundos
        setTimeout(() => {
            errorMessage.classList.remove('highlight');
        }, 1000);
    }
});
// Agregar un controlador de eventos al nuevo botón "Nueva cotización"
document.querySelector('.btn-primary').addEventListener('click', function () {
    // Desbloquear los campos de entrada y selección
    document.querySelectorAll('input:not(.btn-danger, .btn-primary):not(#modalContacto input), select:not(#modalContacto select)').forEach(function (el) {
        el.disabled = false;
    });
    // Mostrar los botones ocultos
    document.querySelector('.btn-success').style.display = 'inline';
    // Ocultar el botón "Nueva cotización"
    this.style.display = 'none';
    // Ocultar el botón "btn-danger"
    document.querySelector('.btn-danger').style.display = 'none';
});
