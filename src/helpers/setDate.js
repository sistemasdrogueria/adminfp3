
export 
const setDate = date => {


var fecha = new Date(date);

// Obtener componentes de la fecha
var dia = fecha.getDate();
var mes = fecha.getMonth() + 1; // Los meses son indexados desde 0
var año = fecha.getFullYear();

// Crear una cadena de fecha formateada
var fechaFormateada = dia + " de " + obtenerNombreMes(mes) + " de " + año;

// Función para obtener el nombre del mes
function obtenerNombreMes(mes) {
    var nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return nombresMeses[mes - 1];
}
return fechaFormateada;
}