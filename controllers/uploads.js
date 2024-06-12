// subir archivos
const { subirArchivo } = require("../helpers/subir-archivo");

// funcion para cargar/subir imagenes
const cargarArchivos = async ( req, res ) => {
    // verificar si vienen archivos y en caso de que no haya por lo menos uno muestra un error
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    // llamamos la funcion para subir el archivo
    // path completo del archivo
    // archivo & extensiones & nombre de la carpeta
    // se usan las extensiones por defecto y la carpeta seguira siendo la misma asi que no se manda nombre de carpeta
    // nombre de la imagen
    const nombre = await subirArchivo( req.files );
    // respuesta
    res.json({
        nombre
    });
    
}
// exports
module.exports = {
    cargarArchivos
}