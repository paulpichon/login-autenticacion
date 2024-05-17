// Router Express
const { Router } = require('express');
// CONTROLLERS
// verificar correo de usuario(cuenta creada)
const { verificarCorreo } = require('../controllers/auth');
// const router
const router = Router();

// Get
// verificar correo
router.get('/verificar-correo/:token', verificarCorreo);

// exports
module.exports = router;