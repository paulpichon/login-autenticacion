// Router Express
const { Router } = require('express');
// express validator
const { check } = require('express-validator');
// Validar Campos
const { validarCampos } = require('../middlewares/validar-campos');
// CONTROLLERS
// verificar correo de usuario(cuenta creada)
// Login de usuarios
// envio de correo con link de reestablcer contraseña
// reestablecer contraseña
// google sign in
const { verificarCorreo, 
        login, 
        envioCorreoReestablecerPassword, 
        reestablecerPassword,
        googleSignIn
} = require('../controllers/auth');
// const router
const router = Router();

// Get
// verificar cuenta de usuario
router.get('/verificar-correo/:token', verificarCorreo);
// Login de usuarios
router.post('/login', [
    // validar que el correo venga en el campo y sea valido
    check('correo', 'El correo es obligatorio').isEmail(),
    // validar el password venga en el campo
    check('password', 'El password es obligatorio').trim().notEmpty(),
    // validar campos
    validarCampos
], login);
// envio de correo con link reestablecer contraseña
router.post('/cuentas/password-olvidado', [
    // validar que el correo sea valido
    check('correo', 'El correo no es valido').isEmail(),
    // validar campos
    validarCampos
], envioCorreoReestablecerPassword);
// Reestablecer contraseña
router.post('/cuentas/reestablecer-password/:token', [
    // validar el password
    check('password', 'El password es obligatorio: debe tener al menos 6 caracteres').trim().isLength({ min: 6  }),
    // validar campos
    validarCampos
], reestablecerPassword);
// Inciar sesion con GOOGLE SIGN IN
router.post('/google', [
    // validar el password
    check('id_token', 'El ID_TOKEN es necesario').notEmpty(),
    // validar campos
    validarCampos
], googleSignIn);

// exports
module.exports = router;