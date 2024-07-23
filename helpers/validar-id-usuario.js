// funcion para validar ID del usuario exista en la BD
// Tambien validamos que tanto email_validated = true y estatus = 1
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
    // si existe el usuario pero el estatus = 0 e email_validated = false no existe el usuario 
    if ( existeIdUsuario.estatus === 0 && existeIdUsuario.email_validated === false ) {
        throw new Error(`El usuario con ID ${ uid } existe pero no tiene email_validated:true y estatus:1`);
    }
}
// exports
module.exports = {
    validarIdUsuario
}