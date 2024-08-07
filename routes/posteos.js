// Router Express
const { Router } = require('express');
// express validation
const { check } = require('express-validator');
// Controllers
const { posteosGet, 
        posteoGet, 
        posteosUsuarioGet,
        posteosPost, 
        posteosPut, 
        posteosDelete, 
} = require('../controllers/posteos');
// validar el JWT del usuario con sesion iniciada
const { validarJWT } = require('../middlewares/validar-jwt');
// Validar Campos
const { validarCampos } = require('../middlewares/validar-campos');
// Validar img de posteo
const { validarImgPosteo } = require('../middlewares/validar-imagen-posteo');
// const router
const router = Router();

// Get obtener Posteos
router.get('/', posteosGet);
// Get obtener un posteo
router.get('/post/:id', posteoGet);
// Get posteos de usuario
router.get('/usuario/:idUsuario', posteosUsuarioGet);
// Crear un Post
router.post('/', [
        // validar que el token venga y sea valido
        validarJWT,
        // Validar que el texto no este vacio
        // Se limpian los espacios en blanco
        check('texto', 'El campo texto no puede estar vacio').trim().notEmpty(),
        // Validar que el campo imagen no este vacio
        validarImgPosteo,
        // check('img').custom(  ), 
        // Validar los campos
        validarCampos
], posteosPost);
// Put - Actualizar un posteo
router.put('/:id', posteosPut);
// Delete -eliminar un posteo
router.delete('/:id', posteosDelete);
// exports
module.exports = router;