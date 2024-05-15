// controllers usuarios
// Modelo Usuario
const Usuario = require("../models/usuario");

//GET 
const usuariosGet = (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'GET APP CONTROLLERS'
    });
}
// POST
const usuariosPost = async (req, res) => {
    // body
    const { nombre_completo, correo, password } = req.body;
    // crear el usuario
    const usuario = await Usuario({ nombre_completo, correo, password });
    // Guardar el usuario en la BD
    await usuario.save();
    // RESPUESTA
    res.json({
        status: 200,
        usuario
    });
}
// PUT
const usuariosPut = (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'PUT APP CONTROLLERS'
    });
}
// DELETE
const usuariosDelete = (req, res) => {
    // RESPUESTA
    res.json({
        msg: 'DELETE APP CONTROLLERS'
    });
}
// exports
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}