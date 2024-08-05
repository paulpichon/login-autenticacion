// exportar todo
// crearJWT
const crearJwt              = require('./crear-jwt');
// googleVerify
const googleVerify          = require('./google-verify');
// subirArchivos
const subirArchivos         = require('./subir-archivo');
// validarCorreoUsuario
const validarCorreoUsuario  = require('./validar-correo-usuario');
// ValidarIdUsario
const ValidarIdUsario       = require('./validar-id-usuario');
// validarJwt
const validarJwt            = require('./validar-jwt');
// exports
// se pone el spread operator para esparcir todo su contenido
module.exports = {
    ...crearJwt,
    ...googleVerify,
    ...subirArchivos,
    ...validarCorreoUsuario,
    ...ValidarIdUsario,
    ...validarJwt
}