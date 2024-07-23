// Router Express
const { Router } = require('express');
// CONTROLLERS
const { usuariosGet, 
        usuarioGet,
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
} = require('../controllers/usuarios');
// Express Validator
const { check } = require('express-validator');
// Validar Campos
const { validarCampos } = require('../middlewares/validar-campos');
// validar correo usuario
const { validarCorreoUsuario } = require('../helpers/validar-correo-usuario');
// validar el ID del usuario exista en la BD
const { validarIdUsuario } = require('../helpers/validar-id-usuario');
// const router
const router = Router();

// Get obtener usuarios
router.get('/', usuariosGet);
// obtener usuario por URL
router.get('/:url', usuarioGet);

// Post
router.post('/', [
        // validar el nombre
        check('nombre_completo.nombre', 'El nombre es obligatorio').trim().notEmpty(),
        // validar el apellido
        check('nombre_completo.apellido', 'El apellido es obligatorio').trim().notEmpty(),
        // validar que el correo sea valido
        check('correo', 'El correo no es valido').isEmail(),
        // validar que el correo no este repetido
        check('correo').custom( validarCorreoUsuario ),
        // validar el password
        check('password', 'El password es obligatorio: debe tener al menos 6 caracteres').trim().isLength({ min: 6  }),
        // validar el estatus sea un numero
        check('estatus', 'El estatus debe ser de tipo numerico').optional().trim().isNumeric(),
        // validar los intentos del usuario de entrar a su cuenta
        check('intentos_login', 'Los intentos de login deben ser de tipo numerico').optional().trim().isNumeric(),
        validarCampos
], usuariosPost);

// Put
router.put('/:id', [
        // validar el id
        check('id', 'El ID no es valido').isMongoId(),
        // validar que el ID exista en la BD
        check('id').custom( validarIdUsuario ),
         // validar el nombre
         check('nombre_completo.nombre', 'El nombre es obligatorio').optional().trim().notEmpty(),
         // validar el apellido
         check('nombre_completo.apellido', 'El apellido es obligatorio').optional().trim().notEmpty(),
         // validar el password
         check('password', 'El password es obligatorio: debe tener al menos 6 caracteres').optional().trim().isLength({ min: 6  }),
        //  validar el nombre del estado
         check('lugar_radicacion.nombre_estado', 'El campo nombre_estado no puede estar vacio').optional().notEmpty(),
        //  validar el id_municipio del estado
         check('lugar_radicacion.id_municipio', 'El campo id_municipio no puede estar vacio').optional().notEmpty(),
        //  validar el nombre_municipio
         check('lugar_radicacion.nombre_municipio', 'El campo nombre_municipio no puede estar vacio').optional().notEmpty(),
        //  validar genero
        check('genero', 'El genero no puede estar vacio: [MASCULINO, FEMENINO, PREFIERO NO DECIR]').optional().isIn(['MASCULINO', 'FEMENINO', 'PREFIERO NO DECIR']),
        // validar la fecha de nacimiento
        check('fecha_nacimiento', 'La fecha no es valida').optional().isDate(),
        // validar la imagen del perfil
        check('imagen_perfil', 'El campo imagen_perfil no puede estar vacio').optional().trim().notEmpty(),
        validarCampos
], usuariosPut);

// Delete
router.delete('/:id', [
        // validar el id
        check('id', 'El ID no es valido').isMongoId(),
        // validar que el ID exista en la BD
        check('id').custom( validarIdUsuario ),
        validarCampos
], usuariosDelete);
// exports
module.exports = router;