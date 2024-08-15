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
// Validar Campos
// validar el JWT del usuario con sesion iniciada
// Validar img de posteo
// validar el id del posteo
const { validarImgPosteo, 
        validarJWT, 
        validarCampos 
} = require('../middlewares');
// Validar el id del posteo
const { validarIdPosteo } = require('../helpers');
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
router.put('/:id', [
        // validar que el token venga y sea valido
        validarJWT,
        // validar mongoid valido
        check('id', 'El ID no es valido').isMongoId(),
        // validar el ID del posteo
        check('id').custom( validarIdPosteo ),
        // Validar los campos
        validarCampos
], posteosPut);
// Delete -eliminar un posteo
router.delete('/:id', posteosDelete);
// exports
module.exports = router;