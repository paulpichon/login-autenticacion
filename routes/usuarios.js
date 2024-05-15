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
        check('nombre_completo.nombre', 'El nombre es obligatorio').trim().notEmpty(),
        check('nombre_completo.apellido', 'El apellido es obligatorio').trim().notEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( validarCorreoUsuario ),
        validarCampos
], usuariosPost);

// Put
router.put('/', usuariosPut);

// Delete
router.delete('/', usuariosDelete);
// exports
module.exports = router;