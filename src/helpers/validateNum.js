
export 
const validateNum = cantidad => {
cantidad = cantidad.toString();
if(cantidad.includes(",")) {

    cantidad = cantidad.replace(/\./g, '');
    cantidad = cantidad.replace(",", ".");

    // Convertimos la cadena a un número de punto flotante
    var numeroFloat = parseFloat(cantidad);
    var numeroFloat = parseFloat(cantidad);
    // Realizamos la multiplicación
return numeroFloat;
}else{

    return cantidad
}


}