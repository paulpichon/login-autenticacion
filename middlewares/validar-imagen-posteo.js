// Funcion para validar la IMG del posteo a subirdel usuario
const validarImgPosteo = async ( req, res, next  ) => {
    // validar que se envien files en la peticion
    if (!req.files ) {
        return res.status(404).json({
            msg: 'No hay ninguna imagen para subir'
        });
        // Validar que req.files.img venga en la peticion
    } else if (!req.files.img) {
        return res.status(404).json({
            msg: 'El campo img no viene en la peticion'
        }); 
    }
    // Pasar al siguiente campo
    next();
}
// exports
module.exports = {
    validarImgPosteo
}