// jsonwebtoken
const jwt = require("jsonwebtoken");// valida el JWT del usuario que inicio sesion
// Modelo usuario
const Usuario = require("../models/usuario");
// Funcion para validar el JWT
const validarJWT = async (req, res, next ) => {
    // obtener el token de headers
    const token = req.header('x-token');
    // si no viene token
    if ( !token ) {
        // 401 = unauthorized -> indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    // para mayor seguridad hacemos un try catch para verificar si el TOKEN es valido
    try {
        // funcion para verificar el JWT
        // desestructuramos id
        const { id } = jwt.verify( token, process.env.JWT_SEED);
        //leer el usuario que corresponde al id
        //traemos al usuario que corresponde al id
        const usuario = await Usuario.findById( id );
        //si el usuario no existe en la BD
        //esta alerta saldra si el usuario ya no existe fisicamente en la BD
        if ( !usuario ) {
            return res.status(401).json({
                //mostramos alerta
                msg: 'Token no válido - usuario no existe en BD'
            });
        }
        //validar que el usuario autenticado tenga activada su cuenta, de lo contrario se mostrar un error porque debe estar activada la cuenta para que el mismo usuario pueda borrar su cuenta
        if ( usuario.estatus === 0 || usuario.email_validated === false ) {
            return res.status(401).json({
                //mostramos alerta
                msg: 'Token no válido - cuenta no activada por usuario: para elimar la cuenat el usuario debe de activar su cuenta'
            });
        }
        // creamos una propiedad nueva en el request
        req.usuario = usuario;
        //pasar al siguiente MIDDLEWARE
        next();
    } catch (error) {
        console.log( error );
        // 401 = unauthorized -> indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}
// exports
module.exports = {
    validarJWT
}