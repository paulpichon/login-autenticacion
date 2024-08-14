// Necesitamos un TOKEN para poder crear un POSTEO
// Modelo Posteo
const Posteo = require("../models/posteo");
// jsonwebtoken
const jwt = require("jsonwebtoken")
// Subir archivos 
const { subirArchivo } = require("../helpers/subir-archivo");


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