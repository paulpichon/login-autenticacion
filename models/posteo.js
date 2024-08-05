// Modelo de los Posteos/Publicaciones de los usuarios, que de momento solo tendra LIKES y no comentarios!

const {Schema, model} = require('mongoose');

const PosteosSchema = Schema({
    _idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    texto: {
        type: String,
        required: [true, 'El texto del post es obligatorio']
    }, 
    img: {
        type: String,
        required: [ true, 'La imagen es obligatoria']
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }

});
// 
PosteosSchema.methods.toJSON = function() {
    // destructuring
    const { __v, ...posteo } = this.toObject();
    // regresar los demas valores de posteo
    return posteo;
}
// export
module.exports = model('Posteo', PosteosSchema);