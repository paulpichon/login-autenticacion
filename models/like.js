// Modelo de la coleccion LIKES, para alamcenar los likes de las publicaciones de los usuarios
// 
const { model, Schema } = require('mongoose');

// Schema
const LikeSchema = Schema({
    _idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    _idPosteo: {
        type: Schema.Types.ObjectId,
        ref: 'Posteo',
        required: true
    }
},{ timestamps: true });
 // Evita duplicados
LikeSchema.index({ 
    _idUsuario: 1, 
    _idPosteo: 1 }, 
    { unique: true }
);
// Exports
module.exports = model( 'Like', LikeSchema);