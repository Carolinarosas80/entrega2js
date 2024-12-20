// Lista de productos disponibles (array de objetos)
const productos = [
    { nombre: "Manta", precio: 45000 },
    { nombre: "Camino de mesa ", precio: 10000 },
    { nombre: "Panio de cocina ", precio: 9000 },
    { nombre: "Funda de almohadon", precio: 7500 },
    { nombre: "Mantel", precio: 30000 },
];

// Función para buscar un producto por su nombre
function buscarProducto(nombreProducto) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
}

// Función para filtrar productos por un rango de precio
function filtrarProductosPorPrecio(minPrecio, maxPrecio) {
    return productos.filter(producto => producto.precio >= minPrecio && producto.precio <= maxPrecio);
}

// Función para calcular intereses, cuotas y descuento en efectivo
function calcularInteresCuotas(precioProducto, cantidad, numeroCuotas, pagoEnEfectivo) {
    // Validar entradas
    if (precioProducto <= 0 || cantidad <= 0 || numeroCuotas <= 0) {
        return "Error: Todos los valores deben ser mayores a 0.";
    }

    // Calcular el costo total sin interés
    let costoTotal = precioProducto * cantidad;

    // Aplicar descuento si el pago es en efectivo
    if (pagoEnEfectivo) {
        costoTotal *= 0.90; // 10% de descuento
    }

    // Determinar la tasa de interés según el costo total y número de cuotas
    let interesRate = 0;
    if (numeroCuotas === 3) {
        interesRate = 0; // Sin interés para 3 cuotas
    } else if (costoTotal <20000) {
        interesRate = 0.05; // 5% de interés
    } else if (costoTotal >= 25000 && costoTotal <= 60000) {
        interesRate = 0.10; // 10% de interés
    } else {
        interesRate = 0.15; // 15% de interés
    }

    // Calcular el interés y el costo total con interés
    const interes = costoTotal * interesRate;
    const costoConInteres = costoTotal + interes;

    // Calcular el valor de cada cuota
    const valorCuota = costoConInteres / numeroCuotas;

    // Retornar los resultados
    return {
        costoTotalSinInteres: costoTotal.toFixed(2),
        tasaInteres: (interesRate * 100).toFixed(2) + "%",
        costoConInteres: costoConInteres.toFixed(2),
        valorCuota: valorCuota.toFixed(2),
        descuentoAplicado: pagoEnEfectivo ? "10% aplicado" : "No aplicado",
    };
}

// Interfaz para el usuario
alert("Bienvenido al sistema de cálculo de cuotas y búsqueda de productos.");

// Opción: buscar un producto
const buscar = prompt("¿Desea buscar un producto por nombre? (sí/no)").toLowerCase();
if (buscar === "sí") {
    const nombreProducto = prompt("Ingrese el nombre del producto a buscar:");
    const productoEncontrado = buscarProducto(nombreProducto);

    if (productoEncontrado) {
        alert(`Producto encontrado: ${productoEncontrado.nombre}, Precio: $${productoEncontrado.precio}`);
    } else {
        alert("Producto no encontrado.");
    }
}

// Opción: filtrar productos por rango de precios
const filtrar = prompt("¿Desea filtrar productos por precio? (sí/no)").toLowerCase();
if (filtrar === "sí") {
    const minPrecio = parseFloat(prompt("Ingrese el precio mínimo:"));
    const maxPrecio = parseFloat(prompt("Ingrese el precio máximo:"));
    const productosFiltrados = filtrarProductosPorPrecio(minPrecio, maxPrecio);

    if (productosFiltrados.length > 0) {
        alert("Productos encontrados:\n" + productosFiltrados.map(p => `- ${p.nombre}: $${p.precio}`).join("\n"));
    } else {
        alert("No se encontraron productos en ese rango de precios.");
    }
}

// Calcular cuotas
const nombreProducto = prompt("Ingrese el nombre del producto para calcular las cuotas:");
const productoSeleccionado = buscarProducto(nombreProducto);

if (productoSeleccionado) {
    const cantidad = parseInt(prompt("Ingrese la cantidad de productos:"));
    const numeroCuotas = parseInt(prompt("Ingrese el número de cuotas (por ejemplo, 3, 6, 12):"));
    const pagoEnEfectivo = prompt("¿El pago será en efectivo? (sí/no)").toLowerCase() === "sí";

    const resultado = calcularInteresCuotas(productoSeleccionado.precio, cantidad, numeroCuotas, pagoEnEfectivo);

    if (typeof resultado === "string") {
        alert(resultado); // Mostrar error si hay datos inválidos
    } else {
        alert(`Resumen del cálculo para "${productoSeleccionado.nombre}":
        - Costo total sin interés (con descuento): $${resultado.costoTotalSinInteres}
        - Descuento por pago en efectivo: ${resultado.descuentoAplicado}
        - Tasa de interés aplicada: ${resultado.tasaInteres}
        - Total con interés: $${resultado.costoConInteres}
        - Pago por cuota (${numeroCuotas} cuotas): $${resultado.valorCuota}`);
    }
} else {
    alert("Producto no encontrado.");
}
