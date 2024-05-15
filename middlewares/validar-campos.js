// Express Validator
const { validationResult } = require("express-validator")

// Validar Campos
const validarCampos = ( req, res, next ) => {
    // errores
    const errores = validationResult( req );
    // verificar los errores y en caso de que haya, mostrarlos
    if ( !errores.isEmpty() ) {
        return res.json( errores );
    }
    // pasar al siguiente middleware
    next();
}
// exports
module.exports = {
    validarCampos
}