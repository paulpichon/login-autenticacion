// Modelo Usuario
const usuario = require("../models/usuario")

// Validar correo del usuario
const validarCorreoUsuario = async ( correo = '' ) => {
    // buscar el correo en la BD
    const existeCorreo = await usuario.findOne({ correo });
    // Verificar si hay resultados de la busqueda
    if ( existeCorreo ) {
        // mostrar una alerta
        throw new Error(`El correo: ${ correo } ya esta registrado en la BD`);
    }
}
// exports
module.exports = {
    validarCorreoUsuario
}