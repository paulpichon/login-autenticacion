
//GET - Mostrar todos los posteos de todos los usuarios
const posteosGet = (req, res) => {
    // DE MOMENTO ESTA API NO SE VA A OCUPAR
    // RESPUESTA
    res.json({
        msg: 'GET POSTEOS'
    });
}
// Get - Mostrar un solo posteo
const posteoGet = async ( req, res) => {
    // RESPUESTA
    res.json({
        msg: 'GET POSTEO'
    });
}
// Get - Mostrar todos los posteos de un solo usuario mediante su ID
const posteosUsuarioGet = async ( req, res) => {
    // RESPUESTA
    res.json({
        msg: 'GET POSTEOS POR ID DE USUARIO'
    });
}
// POST - Crear un POSTEO
const posteosPost = async (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'CREAR POSTEO'
    });
}
// PUT - ACTUALIZAR UNA PUBLICACION * Verificar si es necesario este endpoint
const posteosPut = async (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'PUT POSTEO'
    });
}
// DELETE - BORRAR UNA PUBLICACION
const posteosDelete = async (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'ELIMINAR POSTEO'
    });
}
// exports
module.exports = {
    posteosGet,
    posteoGet,
    posteosUsuarioGet,
    posteosPost,
    posteosPut,
    posteosDelete
}