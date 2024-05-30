// Router Express
const { Router } = require('express');
// express validator
const { check } = require('express-validator');
// Validar Campos
const { validarCampos } = require('../middlewares/validar-campos');
// CONTROLLERS
// verificar correo de usuario(cuenta creada)
// Login de usuarios
const { verificarCorreo, login } = require('../controllers/auth');
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

// exports
module.exports = router;