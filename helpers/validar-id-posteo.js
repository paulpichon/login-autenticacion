// Modelo Posteo
const Posteo = require("../models/posteo");

// Funcion para validar el ID del posteo y que existe en la BD
const validarIdPosteo = async ( id ) => {
    // buscar el id en la BD
    const posteo = await Posteo.findById( id );
    // validar que existe en la BD
    if ( !posteo ) {
        throw new Error(`El posteo con ID: ${ id } no existe en la BD`);
    }
}
// exports
module.exports = {
    validarIdPosteo
}