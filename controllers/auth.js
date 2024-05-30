// controladores de AUTH
// Usuario model
const Usuario = require("../models/usuario");
// bcryptjs
const bcryptjs = require('bcryptjs');
// verificar el correo enviado al usuario
const { verificarCorreoEnviado } = require("../email/servicios-autenticacion-correo");
const { crearJWT } = require("../helpers/crear-jwt");



// controlador de verificar correo por usuario
// se manda un link al correo del usuario que creo la cuenta
const verificarCorreo = ( req, res ) => {
    // DESESTRUCTURAMOS TOKEN
    const { token } = req.params;
    // 
    verificarCorreoEnviado( token )
        .then( () => res.json('Cuenta verificada') )
            // .catch( error => console.log( error, res ));
            .catch( error => {
                // Esto muestra un error en la consola, debemos mejorar este manjeo del error
                // si no se pudo resolver la verificacion de la cuenta mostramos un mensaje
                // console.log( error, res )
                console.log( error )
                // return res.status(500).json(error.message)
                // res.json('Token invalido o ha expirado')
            });
}
// Login de usuarios
const login = async ( req, res ) => {
    // body
    const { correo, password } = req.body;
    // buscar el usuario en base al correo
    const usuario = await Usuario.findOne({ correo });
    try {
        //validar el correo exista en la base de datos
        if ( !usuario ) return res.status( 401 ).json({
            msg: 'Correo/contraseña invalidos - el correo no existe en la BD'
        })
        // validar que el email_validated sea true
        if ( !usuario.email_validated ) return res.status( 401 ).json({
            msg: 'Correo/contraseña invalidos - La cuenta no esta verificada'
        });
        // validar que el estatus sea 1 = cuenta activada
        if ( usuario.estatus !== 1 ) return res.status( 401 ).json({
            msg: 'Correo/contraseña invalidos - La cuenta no esta activada'
        });
        // validar que la contraseña sea correcta
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if ( !validarPass ) return res.status( 401 ).json({
            msg: 'Correo/contraseña invalidos - contraseña incorrecta'
        });
        // crear el TOKEN de acceso
        // con 15 minutos para expirar
        // mandamos el id del usuario como un objeto y el tiempo de expiracion del token como segundo argumento
        const token = await crearJWT( {id: usuario.id }, 90000);
        // respuesta
        return res.json({
            usuario,
            token
        });

        
    } catch (error) {
        // console.log( error );
        return res.status(500).json(error.message)
    }
}
// exports
module.exports = {
    verificarCorreo,
    login
}