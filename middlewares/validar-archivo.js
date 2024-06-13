// middleware para validar el archivo a subirse
const validarArchivoSubir = ( req, res, next ) => {
    // verificar si vienen archivos y en caso de que no haya por lo menos uno muestra un error
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir. - validarArchivoSubir'
        });
    }
    // pasar al siguiente middleware o ruta
    next();
}
// exports
module.exports = {
    validarArchivoSubir
}