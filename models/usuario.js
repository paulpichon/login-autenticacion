// Modelo Usuario
const { Schema, model } = require('mongoose');

// Schema
const UsuariosSchema = Schema({
    // nombre
    nombre_completo: {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        apellido: String,
    },
    // correo
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    // password
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    // telefono *(verificar si es necesario el telefono)
    // Estado y id_municipio(donde vive)
    lugar_radicacion: {
        nombre_estado: {
            type: String,
            default: 'TLAXCALA'
        },
        id_municipio: {
            type: Number,
            default: undefined,
        },
        nombre_municipio: {
            type: String,
            default: undefined
        },
    },
    // url de la cuenta del usuario
    url: {
        type: String,
        required: [true, 'El URL es obligatorio']
    },
    // genero (hombre, mujer, prefiero no decir)
    genero: {
        type: String,
        enum: ['MASCULINO', 'FEMENINO', 'PREFIERO NO DECIR']
    },
    // fecha_nacimiento
    fecha_nacimiento: {
        type: Date
    },
    // imagen_perfil
    imagen_perfil: {
        type: String,
        default: 'assets/no-image.jpg'
    },
    // estatus(no activada = 0, cuenta activada = 1, infringio alguna norma de la comunidad = 2)
    // con este campo podemos cambiar el estatus del usuario
    estatus: {
        type: Number,
        default: 0, 
        enum: [0, 1, 2]
    },
    // google: por defecto esta en false, si esta en true quiere decir que creo una cuenta con GOOGLE SIGNIN
    google: {
        type: Boolean,
        default: false
    },
    // email_validated( para validar la cuenta true or false)
    // con este campo se activa la cuenta del usuario
    email_validated: {
        type: Boolean,
        default: false
    },
    // intentos( de entrar a la cuenta)
    intentos_login: {
        type: Number,
        default: 0
    },
    // fecha_registro
    fecha_registro: {
        type: Date, 
        default: Date.now
    },
    // fecha_actualizacion
    fecha_actualizacion: {
        type: Date, 
    }
});
// cambiar visualmente _id por uuid
UsuariosSchema.methods.toJSON = function() {
    // destructurar las propiedades que queremos cambiar o quitar de la respuesta
    const { _id, password, __v, ...usuario } = this.toObject();
    // cambiar _id por UUID
    usuario.uid = _id;
    // devolver el objeto
    return usuario;
}
// exports
module.exports = model('Usuario', UsuariosSchema);
