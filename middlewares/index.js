// exports
// validarcampos
const validarCampos = require('../middlewares/validar-campos');
// validarArchivoSubir
const validarArchivo = require('../middlewares/validar-archivo');
// validarJWT
const validarJWT = require('../middlewares/validar-jwt');

// exports
module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT
}