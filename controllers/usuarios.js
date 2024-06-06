// controllers usuarios
// Modelo Usuario
const Usuario = require("../models/usuario");
// bcryptjs
const bcryptjs = require('bcryptjs');
// Crear el JWT
const { crearJWT } = require("../helpers/crear-jwt");
// Envio de correo para verificar cuenta
const { envioCorreoVerificacion } = require("../email/servicios-autenticacion-correo");

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
    // encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar el usuario en la BD
    await usuario.save();
    // despues de guardar el usuario en al BD, se debe crear el TOKEN
    const token = await crearJWT({ uid: usuario._id, correo: usuario.correo} );

    // si esta en DESARROLLO SEND_EMAIL sera igual a FALSE, si esta en PRODUCCION sera TRUE
    // enviar el correo con el link para verificar la cuenta 
    if ( process.env.SEND_EMAIL !== false ) {
        // si es true se manda el email de lo contrario no se envia
        await envioCorreoVerificacion( usuario.nombre, usuario.correo );        
    }
    // RESPUESTA
    res.json({
        status: 200,
        usuario,
        token
    });
}
// PUT
const usuariosPut = async (req, res) => {
    // obtener el ID del usuario
    const { id } = req.params;
    // obtener el body
    // se quita _id y correo ya que esos campos no se deben de actualizar
    const { _id, password, correo, google, ...resto } = req.body;
    // verificar si es usuario de google
    // debemos mandar por default el cmapo GOOGLE en el formulario del FRONTEND
    if ( google ) {
        // si es usuario de google, no se actualiza el correo
        // no se actualiza el password
        // por defecto sera "google_sign_in"
        resto.password = "google_sign_in"; //google_sign_in
    } else {
        // si viene contraseña la contraseña, la encriptamos
        if ( password ) {
            // encriptar la contraseña 
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(password, salt);
        }
    }
    // fecha de actualizacion del registro
    resto.fecha_actualizacion = Date.now();
    // actualizar
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {
        new: true
    });
    // RESPUESTA
    res.json({
        usuario
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