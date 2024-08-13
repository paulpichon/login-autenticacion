// controladores de AUTH
// Usuario model
const Usuario = require("../models/usuario");
// bcryptjs
const bcryptjs = require('bcryptjs');
// verificar el correo enviado al usuario
const { verificarCorreoEnviado } = require("../email/servicios-autenticacion-correo");
// Crear el JWT
const { crearJWT } = require("../helpers/crear-jwt");
// Envio de correo con link para reestablcer la contraseña
// reestablecer password
const { envioCorreoLinkReestablecerPassword, 
        reestablecerPasswordUsuario } = require("../email/servicios-correo-reestablecer-password");
// validar el token de google
const { googleVerify } = require("../helpers/google-verify");
// crear URL para el perfil de usuario
const { crearUrlUsuarioPerfil } = require("../helpers/crear-url-usuario");



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
        if ( !validarPass ) {
             // si la contraseña es incorrecta ademas de mostrar una alerta debemos actualizar el campo INTENTOS_LOGIN +1
            //  contador 
            let contador = Number( usuario.intentos_login );
            // incrementar en 1
            contador++;
            // actualizar la BD
            await Usuario.findByIdAndUpdate(usuario.id, { intentos_login: contador }, {});
            // mostrar el error
            return res.status( 401 ).json({
                msg: 'Correo/contraseña invalidos - contraseña incorrecta'
            });
        }
        // crear el TOKEN de acceso
        // con 15 minutos para expirar
        // mandamos el id del usuario como un objeto y el tiempo de expiracion del token como segundo argumento
        // se pone uid ya que al desestructurar el token para validarlo se espera uid
        const token = await crearJWT( { uid: usuario.id }, 90000);
        // actualizar intentos_login a 0 ya que paso los filtros
        // actualizar la BD
        await Usuario.findByIdAndUpdate(usuario.id, { intentos_login: 0 }, {});
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
// Envio de correo con link para reestablcer la contraseña
const envioCorreoReestablecerPassword = async ( req, res ) => {
    // body
    const { correo } = req.body;
    // buscar el correo en la BD
    const usuario = await Usuario.findOne({ correo });
    // si no existe
    if ( !usuario ) {
        return res.status( 404 ).json({
            msg: 'El correo no existe en la BD'
        });
    }
    // verificar que email_validated sea true
    if ( !usuario.email_validated ) {
        return res.status( 401 ).json({
            msg: 'El usuario no ha verificado su cuenta'
        });
    }
    // llamar la funcion para enviar el correo
    await envioCorreoLinkReestablecerPassword( usuario.nombre, correo );

    // respuesta
    res.json({
        msg: 'Correo enviado con el link para reestablecer password'
    });

}
// Reestablecer contraseña del usuario
const reestablecerPassword = async ( req, res ) => {
    // token
    const { token } = req.params;
    // password
    const { password } = req.body;
    // validar el token y actualizar la contraseña
    reestablecerPasswordUsuario( token, password )
        .then( async () => {
            res.json('Password reestablecido');
        })
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
// Google Sign In/ Authentication
const googleSignIn = async( req, res) => {
    
    // id_token debe de venir en el body
    const { id_token } = req.body;
    // console.log( id_token );

    try {
        // const googleUser = await googleVerify( id_token );
        // console.log( googleUser );
        const { nombre_completo, imagen_perfil, correo } = await googleVerify( id_token );

        // verificar si el correo existe en las bases de datos
        let usuario = await Usuario.findOne({ correo });
        // si el usuario no existe
        if (!usuario) {
            // Tengo que crear el usuario en caso de que no exista
            // recordar que en password no importa lo que mandemos ya que no podra hacer match por el HASH que usamos para encriptar las PASSWORD
            const data = {
                nombre_completo,
                correo,
                password: 'google_sign_in',
                imagen_perfil,
                estatus: 1,
                google: true,
                email_validated: true, //no se envio correo, ya que entra con GOOGLESIGNIN
            }
            // Crear URL del usuario que se registra con google signin
            await crearUrlUsuarioPerfil( nombre_completo ).then( urlUsuario => {
                // lo insertamos en el objeto
                data.url = urlUsuario;
            });
            // creo un nuevo usuario
            usuario = new Usuario( data );
            // Guardamos el usuario
            await usuario.save();
        }

        // validar si el usuario tiene estatus 1
        if ( usuario.estatus === 0 ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado - estado-0'
            });
        }

        // Generar el JWT
        // const token = await crearJWT( usuario.id );
        const token = await crearJWT( {id: usuario.id }, 90000 );

        // respuesta
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
}
// exports
module.exports = {
    verificarCorreo,
    login,
    envioCorreoReestablecerPassword,
    reestablecerPassword,
    googleSignIn
}