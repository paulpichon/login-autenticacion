// funcion para validar ID del usuario exista en la BD
// Modelo Usuario
const Usuario = require("../models/usuario")
// funcion
const validarIdUsuario = async( uid = '') => {
    //buscamos el ID en la BD
    const existeIdUsuario = await Usuario.findById( uid );
    // si no encontramos alguna coincidencia mostramos una alerta
    if ( !existeIdUsuario ) {
        throw new Error(`El ID ${ uid } no existe en la BD`);
    }
}
// exports
module.exports = {
    validarIdUsuario
}