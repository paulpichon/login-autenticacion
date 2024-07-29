// exports
// validarcampos
const validarCampos = require('../middlewares/validar-campos');
// validarArchivoSubir
const validarArchivo = require('../middlewares/validar-archivo');
// validarJWT
const validarJWT = require('../middlewares/validar-jwt');
// Validar URL 
const validarUrlUsuario = require('../middlewares/validar-url-usuario');

// exports
module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarUrlUsuario
}