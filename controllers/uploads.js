// response 
const { response } = require("express");
// subir archivos
const { subirArchivo } = require("../helpers/subir-archivo");

// funcion para cargar/subir imagenes
const cargarArchivos = async ( req, res ) => {
    // verificar si vienen archivos y en caso de que no haya por lo menos uno muestra un error
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    // El REJECT que devuelve el archivo subir-archivo.js nos devuelve un error que hace que reviente nuestra aplicacion en consola nos muestra un error muy feo, esto lo podemos manejar poniendo un try y un catch
    try {
        // llamamos la funcion para subir el archivo
        // path completo del archivo
        // ARGUMENTOS ---> archivo & extensiones & nombre de la carpeta
        // se usan las extensiones por defecto y la carpeta seguira siendo la misma asi que no se manda nombre de carpeta
        // nombre de la imagen
        // mandar diferentes extensiones, se podria crear un arreglo con diferentes extensiones y mandarlo como argumento
        // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        // en caso de que no mandemos algun argumento DEBEMOS poner UNDEFINED
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        // respuesta
        res.json({ nombre });

    } catch (msg) {
        return res.status(400).json({ msg });
    }    
}

// funcion para actualizar la imagen de perfil de usuario
const actualizarImagen = async ( req, res = response) => {
    // obtenemos el id de usuario y el nombre de la coleccion
    const { id, coleccion } = req.params;

    // respuesta
    res.json({ id, coleccion });

}

// exports
module.exports = {
    cargarArchivos,
    actualizarImagen
}