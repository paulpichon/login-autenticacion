// Necesitamos un TOKEN para poder crear un POSTEO
// Path
const path = require('path');
// filesystem
const fs = require('fs');
// Modelo Posteo
const Posteo = require("../models/posteo");
// jsonwebtoken
const jwt = require("jsonwebtoken")
// Subir archivos 
const { subirArchivo } = require("../helpers/subir-archivo");
// Funcion para eliminar los archivos del usuario
// const { eliminarArchivosUsuario } = require("../helpers/eliminar-archivos-usuario");


//GET - Mostrar todos los posteos de todos los usuarios
// Este GET es para mostrar al usuario que inicia sesion todos los POSTEOS de todos los usuarios
//Pero se limita a mostrar 15 POSTEOS
const posteosGet = async (req, res) => {
    // DE MOMENTO ESTA API NO SE VA A OCUPAR
    // Parametros de limitacion de posteos
    const limite = 15;
    //Mostrando el total(numero) y los posteos de usuarios 
    const [ total, posteos ] = await Promise.all([
        // Conteo de posteos
        Posteo.countDocuments(),
        // Buscar todos los posteos y traer lo ultimos 15 posteos creados por usuarios
        Posteo.find()
        // Limitamos los registros a 15
        .limit( limite )
        //Traemos los ULTIMOS registros de esta forma { _id : -1 } puede ser por el ID o por fecha_creacion
        // Orden descendente
        // .sort( { _id : -1} ) 
        // { fecha_creacion : -1}
        // tanto por _id o por fecha_creacion se puede usar -1
        .sort( { fecha_creacion : -1} ) 
        
    ]);
    
    // RESPUESTA
    res.json({
        total,
        mostrando: limite,
        posteos
    });
}
// Get - Mostrar un solo posteo
const posteoGet = async ( req, res) => {
    // Obtener el ID del posts
    const { id } = req.params;
    // Buscar el ID del post en la BD
    const posteo = await Posteo.findById( id )
    // populate() sirve para mostrar informacion completa en base a la propiedad a la que se haga señalamiento en este caso nos muestra la informacion a partir de _idUsuario
        // .populate( '_idUsuario' )
        // traemos infORMACION solo la necesaria: 'nombre_completo imagen_perfil url'
        .populate( '_idUsuario', 'nombre_completo imagen_perfil url' )
    // RESPUESTA
    res.json({
        posteo
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
    // Obtener la informacion del TOKEN, necesitamos el UID que viene en el TOKEN para agregarlo en el _idUsuario del posteo
    const token = req.header('x-token');
    // desestructuramos uid del usuario que esta creando el POST
    const { uid } = jwt.verify( token, process.env.JWT_SEED);
    // Obtenemos la informacion del body
    const { texto, img } = req.body;
    // Creamos el posteo
    const posteo = new Posteo({ _idUsuario: uid, texto, img });

    // SUBIR IMAGEN
    try {
        if ( !Array.isArray( req.files.img ) ) {
            const archivos = [req.files.img];
            // console.log( archivos, 'archivos mandados' );
            // con .at(0) decimos que solo tomen en cuenta un archivos aunque se suban mas
            const archivo = archivos.at(0);
            // archivo = imagen cargada
            // undefined = extensiones validas, en este caso no se manda nada ya que por defecto estan jpeg, jpg, png
            // imagen-perfil-usuarios = el nombre de la carpeta/directorio donde se van a subir las imagenes de perfil
            // newWidth y newHeight: How many pixels high the resultant image should be. Use null or undefined to auto-scale the height to match the width.
            // https://sharp.pixelplumbing.com/api-resize
            // Se manda las dimensiones de la imagen ya que hay otra funcion para la imagen de perfil que usa otras medidas de imagen
            const nombre = await subirArchivo( archivo, undefined, `posteos_usuarios/${ uid }`, newWidth = undefined, newWidth = undefined);
            // asignamos a resto.img el nombre del archivo
            posteo.img = `${ uid }/${ nombre }`;
        }
        
    } catch (msg) {
        // console.log(msg);
        return res.status(400).json({ msg });
    }
    // Guardar el POSTEO en la BD
    await posteo.save();
    // RESPUESTA
    res.json( posteo );
}
// PUT - ACTUALIZAR UNA PUBLICACION * Verificar si es necesario este endpoint
const posteosPut = async (req, res) => {
    // ID del posteo
    const { id } = req.params;
    // body
    const{ texto } = req.body;
    // buscamos el posteo por el ID
    // Se actualiza el texto del  posteo y la fecha_actualizacion
    const posteo = await Posteo.findByIdAndUpdate( id, { texto, fecha_actualizacion: Date.now() }, {
        new: true
    });
    // RESPUESTA
    res.json({
        posteo
    });
}
// DELETE - BORRAR UNA PUBLICACION
const posteosDelete = async (req, res) => {
    // Obtener el ID del posteo
    const { id } = req.params;
    // buscar en la BD la ruta de la imagen
    const { img } = await Posteo.findById( id );
    // verificar si existe img en la BD
    if ( img ) {
        // si existe hay que borrar la imagen del servidor
        // se construye el path de la imagen a borrar
        const pathImagen = path.join(__dirname, '../uploads/posteos_usuarios/', img);
        // verificar si existe la imagen fisicamente
        if ( fs.existsSync( pathImagen )) {
            // si existe la imagen, la borramos
            fs.unlinkSync( pathImagen );
        }
    }
    // llamar la funcion para borrar el archivo que se subio en POSTEO
    // buscar el id en la base de datos y borrarlo    
    const posteo = await Posteo.findByIdAndDelete( id );
    // RESPUESTA
    res.json( posteo );
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