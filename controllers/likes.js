// Funcion para dar LIKES a POSTEOS
// jsonwebtoken
const jwt = require("jsonwebtoken")
// Modelo Posteo
const Posteo = require("../models/posteo");
// Modelo Like
const Like = require("../models/like");

// Funcion
const putLikePosteo = async (req, res) => { 
    // Obtener Id de publicacion
    const { id } = req.params;
    try {
        // Buscamos el posteo por su ID de publicacion
        const posteo = await Posteo.findById( id );
        // Obtener la informacion del TOKEN, necesitamos el UID que viene en el TOKEN para agregarlo en el _idUsuario del posteo
        const token = req.header('x-token');
        // desestructuramos uid del usuario que esta creando el POST
        const { uid } = jwt.verify( token, process.env.JWT_SEED);
        if (!posteo) return res.status(404).json({ msg: 'Posteo no encontrada'});
        // Buscar si ya se le dio like a la publicacion
        const existingLike = await Like.findOne({ _idUsuario: uid, _idPosteo: id });
        // En caso de que ya se le haya dado LIKE a la publicacion
        if (existingLike) {
            // Si ya dio like, elimina el like
            await Like.findByIdAndDelete(existingLike._id);
            return res.json({ msg: 'Like eliminado' });
        } else {
            // Si no ha dado like, añade uno nuevo
            const like = new Like({ _idUsuario: uid, _idPosteo: id });
            // Se guarda el LIKE
            await like.save();
            // Retornamos el mensaje
            return res.json({ 
                msg: 'Like añadido',
                posteo 
            });
        }
    } catch (err) {
    res.status(400).send('Error al manejar el like');
    }
}
// Exports
module.exports = {
    putLikePosteo
}