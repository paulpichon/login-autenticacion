// Router Express
const { Router } = require('express');
// CONTROLLERS
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete 
} = require('../controllers/usuarios');
// Express Validator
const { check } = require('express-validator');
// Validar Campos
const { validarCampos } = require('../middlewares/validar-campos');
// validar correo usuario
const { validarCorreoUsuario } = require('../helpers/validar-correo-usuario');
// const router
const router = Router();

// Get
router.get('/', usuariosGet);

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
        check('password', 'El password debe tener minimo 6 caracteres').trim().isLength({ min: 6  }),
        // validar el estatus sea un numero
        check('estatus', 'El estatus debe ser de tipo numerico').optional().trim().isNumeric(),
        // validar los intentos del usuario de entrar a su cuenta
        check('intentos_login', 'Los intentos de login deben ser de tipo numerico').optional().trim().isNumeric(),
        // validar fecha de actualizacion
        check('fecha_actualizacion', 'La fecha no es valida').optional().trim().isDate(),
        validarCampos
], usuariosPost);

// Put
router.put('/', usuariosPut);

// Delete
router.delete('/', usuariosDelete);
// exports
module.exports = router;