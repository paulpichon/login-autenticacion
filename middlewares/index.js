// exports
// validarcampos
const validarCampos = require('../middlewares/validarCampos');
// validarArchivoSubir
const validarArchivo = require('../middlewares/validar-archivo');

// exports
module.exports = {
    ...validarArchivo,
    ...validarCampos
}