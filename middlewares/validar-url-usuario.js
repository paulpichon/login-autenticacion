// Modelo usuario
const Usuario = require("../models/usuario");

// Funcion para validar el URL del usuario exista en la BD
const validarUrlUsuario = async ( req, res, next ) => {
    // URL
    const { url } = req.params;
    // buscar la URL en la BD
    const usuario = await Usuario.findOne({ url });
    // validar que el usuario exista en la BD
    if ( !usuario ) {
        return res.status( 404 ).json({
            msg:`El usuario con URL: ${ url } no existe en la BD`
        });
    }
    // validar que el usuario ternga activada su cuenta email_validated:true
    if ( !usuario.email_validated ) {
        return res.status( 401 ).json({
            msg: `El usuario con URL ${ url } no ha verificado su cuenta: email_validated:false`
        });
    }
    // validar que el usuario tenga el estatus igual a 1
    if ( usuario.estatus === 0 ) {
        return res.status( 401 ).json({
            msg: `El usuario con URL ${ url } no ha verificado su cuenta: estatus:0`
        });
    }
    // pasar al siguiente middleware
    next();
}
// export
module.exports = {
    validarUrlUsuario
}