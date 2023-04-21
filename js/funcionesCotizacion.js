$(document).ready(function () {
    // input producto cambiar imagen icon segun lo seleccionado 
    // Oculta inicialmente ambas imágenes
    document.getElementById("cereza-icon").style.display = "none";
    document.getElementById("arandano-icon").style.display = "none";
    // Función que se ejecuta cuando el usuario cambia la opción seleccionada
    // Define la función actualizarProductoIcono dentro de $(document).ready()
    function actualizarProductoIcono() {
        // Obtiene el valor de la opción seleccionada
        var productoSeleccionado = document.getElementById("select-producto").value;

        // Muestra la imagen correspondiente y oculta la otra
        if (productoSeleccionado === "cereza") {
            document.getElementById("cereza-icon").style.display = "inline";
            document.getElementById("arandano-icon").style.display = "none";
            document.getElementById("frutafina-icon").style.display = "none";
        } else if (productoSeleccionado === "arandano") {
            document.getElementById("cereza-icon").style.display = "none";
            document.getElementById("frutafina-icon").style.display = "none";
            document.getElementById("arandano-icon").style.display = "inline";
        }
    }

    // Asigna la función actualizarProductoIcono al evento onchange del elemento select utilizando jQuery
    $("#select-producto").on("change", actualizarProductoIcono);
    // generar variedades apartir del producto seleccionado 
    const selectProducto = document.querySelector('#select-producto');
    const selectVariedad = document.querySelector('#select-variedad');
    const variedades = {
        arandano: ['Duke', 'Draper', 'Blue Ribbon', 'Blue Crop', 'Liberty', 'Blue Gold', 'Top Shelf', 'Aurora',
            'Last Call', 'New Hanover', 'Alixblue', 'Gupton', 'Ozarkblue®', 'Star', 'Colibrí'],
        cereza: ['Santina', 'Van', 'Bing', 'Stella', 'Lapins', 'Kordia', 'Regina', 'Sweet Heart', 'Burlat',
            'Marvin', 'Royal Tioga', 'Pacific Red', 'Ruby', 'Early Red', 'Royal Bailey', 'Royal Hazel', 'Rocket', 'Carmen', 'Frisco', 'Brocks']
    };
    selectProducto.addEventListener('change', (evento) => {
        const productoSeleccionado = evento.target.value;
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
    const preciosArandano = {       //tipo de arandanos con su precio
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
    const errorMensaje = document.querySelector('#error-mensaje');
    // Agrega un controlador de eventos para el evento keydown
    inputCantidadCajas.addEventListener('keydown', (event) => {
        // Verifica si la tecla presionada es un punto, una coma o una "e"
        if (event.key === '.' || event.key === ',' || event.key === 'e' || event.key === '-') {
            // Cancela el evento para evitar que se ingrese el punto, la coma o la "e"
            event.preventDefault();
        }
    });
    inputCantidadCajas.addEventListener('input', () => {
        let value = inputCantidadCajas.value;
        if (value === '' || !Number.isInteger(Number(value)) || Number(value) <= 0) {
            // El valor ingresado no es válido
            // Mostrar un mensaje de error al usuario
            errorMensaje.textContent = 'El valor debe ser un número entero mayor a 0';
            errorMensaje.style.display = 'block';
        } else {
            // El valor ingresado es válido
            // Ocultar el mensaje de error
            errorMensaje.style.display = 'none';
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
            this.style.display = "none";
            document.querySelector('#error-mensaje').style.display = 'none';
            // Actualiza el contenido del elemento de resumen
            // Convierte el valor a un número
            let cantidadCajasParaMostrar = Number(cantidadCajas);

            if (producto === 'cereza') {
                totalKg = kgCajaCereza[tipoCaja] * cantidadCajas;
                totalProducto = preciosCereza[variedad] * totalKg;
                totalCajas = preciosCajaCereza[tipoCaja] * cantidadCajas;
                total = totalProducto + totalCajas;

                document.getElementById("resumen").innerHTML = `El precio por kg de la variedad <strong>${variedad}</strong> de <strong>${producto}s</strong> es 
            <strong>$${preciosCereza[variedad].toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> 
            y el tipo de caja es "<strong>${tipoCaja}</strong>", su precio por unidad es <strong>$${preciosCajaCereza[tipoCaja].toLocaleString('de-DE')}</strong>, 
            fueron elegidas <strong>${cantidadCajasParaMostrar.toLocaleString('de-DE')}</strong> caja/s. <br>
            Total kg: <strong>${totalKg.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total Producto: <strong>$${totalProducto.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total Cajas: <strong>$${totalCajas.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total a Pagar: <strong>$${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;

            } else if (producto === 'arandano') {
                totalKg = kgCajaArandano[tipoCaja] * cantidadCajas;
                totalProducto = preciosArandano[variedad] * totalKg;
                totalCajas = preciosCajaArandano[tipoCaja] * cantidadCajas;
                total = totalProducto + totalCajas;

                document.getElementById("resumen").innerHTML = `El precio por kg de la variedad <strong>${variedad}</strong> de <strong>${producto}s</strong> es 
            <strong>$${preciosArandano[variedad].toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> 
            y el tipo de caja es "<strong>${tipoCaja}</strong>", su precio por unidad es <strong>$${preciosCajaArandano[tipoCaja].toLocaleString('de-DE')}</strong>, 
            fueron elegidas <strong>${cantidadCajasParaMostrar.toLocaleString('de-DE')}</strong> caja/s. <br>
            Total kg: <strong>${totalKg.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total Producto: <strong>$${totalProducto.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total Cajas: <strong>$${totalCajas.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> <br>
            Total a Pagar: <strong>$${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;

            }

        } else {
            document.querySelector('#error-mensaje').textContent = 'Por favor complete todos los campos';
            document.querySelector('#error-mensaje').style.display = 'block';
            // Agregar la clase "destacar" al elemento "#error-mensaje"
            errorMensaje.classList.add('destacar');
            // Eliminar la clase "destacar" después de unos segundos
            setTimeout(() => {
                errorMensaje.classList.remove('destacar');
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
    window.addEventListener('beforeunload', function () {
        // Limpiar el contenido del formulario
        document.querySelectorAll('input, select').forEach(function (el) {
            el.value = '';
        });
    });
    // generar pdf con jsPDF
    document.querySelector('#descargar-pdf').addEventListener('click', function () {
        // Crear una nueva instancia de jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        // Agregar contenido al PDF
        doc.setFontSize(22);
        doc.text('FrutaFina S.A.', 10, 20);
        doc.addImage('/recursos/imagenes/icon.png', 'JPEG', 170, 10, 25, 25);
        doc.setFontSize(16);
        doc.text(new Date().toLocaleString(), 10, 30);

        let content = document.getElementById("resumen").textContent;
        content = content.replace(/\n/g, ' ');
        content = content.replace(/\t/g, ' ');
        content = content.replace(/ +/g, ' ');

        doc.setFontSize(11);
        const lines = doc.splitTextToSize(content, 180);
        let y = 80;
        lines.forEach(line => {
            doc.text(line, 10, y);
            y += 7;
        });

        const head = [['CONTACTO']];
        const body = [
            ['Buenos Aires: Asunción 1356 P.17 CABA C1000ABC ARGENTINA'],
            ['+54 11 4872 6100'],
            ['contacto@frutafina.com']
        ];

        doc.autoTable({
            head: head,
            body: body,
            startY: y + 10,
            theme: 'plain'
        });

        doc.setFontSize(11);
        // Descargar el archivo PDF
        doc.save('Cotización-FrutaFina-' + new Date().toLocaleString() + '.pdf');
    });

});