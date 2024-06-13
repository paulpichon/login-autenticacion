// exports
// validarcampos
const validarCampos = require('../middlewares/validar-campos');
// validarArchivoSubir
const validarArchivo = require('../middlewares/validar-archivo');

// exports
module.exports = {
    ...validarArchivo,
    ...validarCampos
}