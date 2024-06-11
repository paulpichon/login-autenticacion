// Path
const path = require('path');

// funcion para cargar/subir imagenes
const cargarArchivos = ( req, res ) => {
    // verificar si vienen archivos y en caso de que no haya por lo menos uno muestra un error
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir.'});
    }
    // verificar que si no viene nada en !req.files.archivo mostramos una alerta
    // esto es lo que yo estoy esperando en mi backend --> req.files.archivo
    // tambien se podria poner en el IF de arriba pero queda un poco mas visible lo que queremos de esta forma - pero es practicamente lo mismo
    // if (!req.files.archivo ) {
    //     return res.status(400).json({msg: 'No hay archivos que subir.'});
    // }

    // nombre de mi propiedad
    const { archivo } = req.files;
    // nombre de la ruta
    const uploadPath = path.join( __dirname, '../uploads/', archivo.name );

    // usar el metodo mv() para cambiar el archivo a cualquier parte de nuestro servidor
    archivo.mv(uploadPath, (err) => {
        // si hay algun error
        if (err) return res.status(500).json({err});
        // si todo sale bien
        res.json({ msg: 'File uploaded! ' + uploadPath });
    });
}
// exports
module.exports = {
    cargarArchivos
}