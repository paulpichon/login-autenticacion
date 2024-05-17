// controladores de AUTH


// controlador de verificar correo por usuario
// se manda un link al correo del usuario que creo la cuenta
const verificarCorreo = ( req, res ) => {

    // respuesta
    res.json('validar correo');
}
// exports
module.exports = {
    verificarCorreo
}