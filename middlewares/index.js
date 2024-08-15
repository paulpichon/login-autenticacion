// exports
// validarcampos
const validarCampos = require('../middlewares/validar-campos');
// validarArchivoSubir
const validarArchivo = require('../middlewares/validar-archivo');
// validarJWT
const validarJWT = require('../middlewares/validar-jwt');
// Validar URL 
const validarUrlUsuario = require('../middlewares/validar-url-usuario');
// validarImgPosteo
const validarImgPosteo = require('../middlewares/validar-imagen-posteo');
// exports
module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarUrlUsuario,
    ...validarImgPosteo,
}