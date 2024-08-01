// Necesitamos un TOKEN para poder crear un POSTEO
// Modelo Posteo
const Posteo = require("../models/posteo");
// jsonwebtoken
const jwt = require("jsonwebtoken")

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
    // Obtener la informacion del TOKEN
    const token = req.header('x-token');
    // desestructuramos id del usuario que esta creando el POST
    const { id } = jwt.verify( token, process.env.JWT_SEED);
    // Obtenemos la informacion del body
    const { texto, img } = req.body;
    // Creamos el posteo
    const posteo = new Posteo({ _idUsuario: id, texto, img });
    // Guardar el POSTEO en la BD
    await posteo.save();
    // RESPUESTA
    res.json( posteo );
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