// controllers usuarios
// Path
const path = require('path');
// filesystem
const fs   = require('fs');
// Modelo Usuario
const Usuario = require("../models/usuario");
// bcryptjs
const bcryptjs = require('bcryptjs');
// Crear el JWT
const { crearJWT } = require("../helpers/crear-jwt");
// Envio de correo para verificar cuenta
const { envioCorreoVerificacion } = require("../email/servicios-autenticacion-correo");
// Subir archivo
const { subirArchivo } = require('../helpers/subir-archivo');
// Funcion para crear la URL del usuario
const { crearUrlUsuarioPerfil } = require('../helpers/crear-url-usuario');
// Funcion para eliminar los archivos del usuario
const { eliminarArchivosUsuario } = require('../helpers/eliminar-archivos-usuario');

//GET - Mostrar todos los usuarios
const usuariosGet = (req, res) => {
    // DE MOMENTO ESTA API NO SE VA A OCUPAR
    // RESPUESTA
    res.json({
        msg: 'DE MOMENTO ESTA API PARA MOSTRAR A LOS USUARIOS NO SE VA A OCUPAR'
    });
}
// Get - Mostrar Usuario por URL
const usuarioGet = ( req, res) => {
    // Obtener la URL del usuario

    // RESPUESTA
    res.json({
        msg: 'GET USUARIO APP CONTROLLERS'
    });
}
// POST
const usuariosPost = async (req, res) => {
    // body
    const { nombre_completo, correo, password } = req.body;
    // crear el usuario
    const usuario = await Usuario({ nombre_completo, correo, password });
    // creacion de la URL
    // Debemos verificar que la URL no exista en otra cuenta de usuario ---> podemos crear un middleware para verificarlo o una funcion
    // para la creacion de la URL debemos pasar algunos parametros:
    // nombre_completo: nombre y apellidos, de esta forma se creara la URL del usuario
    await crearUrlUsuarioPerfil( nombre_completo ).then( urlUsuario => {
        // lo insertamos en el objeto
        usuario.url = urlUsuario;
    });
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
        // await envioCorreoVerificacion( usuario.nombre, usuario.correo );        
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
    // debemos mandar por default el campo GOOGLE en el formulario del FRONTEND
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

    // ELIMINAR LA IMAGEN ANTERIOR DE PERFIL DEL USUARIO
    // Consultamos la BD si trae algo la imagen_perfil
    const { imagen_perfil } = await Usuario.findById( id )
    // verificar si existe resto.imagen_perfil en la BD
    if ( imagen_perfil ) {
        // si existe hay que borrar la imagen del servidor
        // se construye el path de la imagen a borrar
        const pathImagen = path.join(__dirname, '../uploads/imagen-perfil-usuarios/', imagen_perfil);
        // verificar si existe la imagen fisicamente
        if ( fs.existsSync( pathImagen )) {
            // si existe la imagen, la borramos
            fs.unlinkSync( pathImagen );
        }
    }

    // ACTUALIZAR LA IMAGEN_perfil DEL USUARIO
    // Se verifica que vengan archivos en el FORM-DATA    
    if (req.files && req.files.imagen_perfil) {
        try {
            if ( !Array.isArray( req.files.imagen_perfil ) ) {
                const archivos = [req.files.imagen_perfil];
                // console.log( archivos, 'archivos mandados' );
                // con .at(0) decimos que solo tomen en cuenta un archivos aunque se suban mas
                const archivo = archivos.at(0);
                // archivo = imagen cargada
                // undefined = extensiones validas, en este caso no se manda nada ya que por defecto estan jpeg, jpg, png
                // imagen-perfil-usuarios = el nombre de la carpeta/directorio donde se van a subir las imagenes de perfil
                const nombre = await subirArchivo( archivo, undefined, 'imagen-perfil-usuarios' );
                // asignamos a resto.imagen_perfil el nombre del archivo
                resto.imagen_perfil = nombre;
            }
        } catch (msg) {
            // console.log(msg);
            return res.status(400).json({ msg });
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
const usuariosDelete = async (req, res) => {
    // Obtener el ID del usuario
    const { id } = req.params;
    // buscar al usuario en la BD
    // debemos analizar si borramos fisicamente al usuario de la BD o solo actualizamos su estatus en la BD
    // Eliminar los archivos que el usuario ha subido
    await eliminarArchivosUsuario( id );
    // Por el momento vamos a eliminarlo fisicamente de las BD
    await Usuario.findByIdAndDelete( id );
    // RESPUESTA
    res.json({
        msg: 'Cuenta eliminada'
    });
}
// exports
module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}