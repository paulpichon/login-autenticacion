// Modelo de los Posteos/Publicaciones de los usuarios, que de momento solo tendra LIKES y no comentarios!

const {Schema, model} = require('mongoose');

const PosteosSchema = Schema({
    // ID del usuario, este se crea al validaar el TOKEN, ahi viene el UID del usuario
    _idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // Texto que acompaña al POSTEO
    texto: {
        type: String,
        required: [true, 'El texto del post es obligatorio']
    }, 
    // IMG del posteo, cabe resaltar que solo se puede subir una sola imagen
    img: {
        type: String,
        required: [ true, 'La imagen es obligatoria']
    },
    // Fecha de creacion del POSTEO
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    // Fecha de actualizacion
    fecha_actualizacion: {
        type: Date,
    }
});
// 
PosteosSchema.methods.toJSON = function() {
    // destructuring
    const { _id, __v, ...posteo } = this.toObject();
    // cambiar vizualmente _id po idPosteo
    posteo.idPost = _id;
    // regresar los demas valores de posteo
    return posteo;
}
// export
module.exports = model('Posteo', PosteosSchema);