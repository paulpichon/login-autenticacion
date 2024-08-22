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
// Validar el id del usuario
const { validarIdPosteo, 
        validarIdUsuario 
} = require('../helpers');
// Likes posteos
const { putLikePosteo } = require('../controllers/likes');
// const router
const router = Router();

// Get obtener Posteos
// Obtener los ultimos 15 posteos que se han registrado en la aplicacion
//Debemos revisar si ponemos token para esta API o no es necesaria
router.get('/', [
        // validar que el token venga y sea valido
        validarJWT,
        //  validar page y limite ambos deben de ser de tipo numero
        check('page', 'El parametro PAGE debe ser de tipo numerico').optional().isNumeric(),
        check('limite', 'El parametro LIMITE debe ser de tipo numerico').optional().isNumeric(),
        // Validar los campos
        validarCampos
], posteosGet);
// Get obtener un posteo
router.get('/post/:id', [
         // validar que el token venga y sea valido
         validarJWT,
         // validar mongoid valido
         check('id', 'El ID no es valido').isMongoId(),
         // validar el ID del posteo
         check('id').custom( validarIdPosteo ),
         // Validar los campos
         validarCampos
], posteoGet);
// Get posteos de usuario
// Obtener todos los posteos de un usuario por ID de usuario
router.get('/usuario/:idUsuario', [
        // validar que el token venga y sea valido
        validarJWT,
        // validar mongoid valido
        check('idUsuario', 'El ID no es valido').isMongoId(),
        // validar el ID del usuario
        check('idUsuario').custom( validarIdUsuario ),
        // validar page y limite ambos deben de ser de tipo numero
        check('page', 'El parametro PAGE debe ser de tipo numerico').optional().isNumeric(),
        check('limite', 'El parametro LIMITE debe ser de tipo numerico').optional().isNumeric(),
        // Validar los campos
        validarCampos
], posteosUsuarioGet);
// Crear un Post
router.post('/', [
        // validar que el token venga y sea valido
        validarJWT,
        // Validar que el texto no este vacio
        // Se limpian los espacios en blanco
        check('texto', 'El campo texto no puede estar vacio').trim().notEmpty(),
        // Validar que el campo imagen no este vacio
        validarImgPosteo,
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
router.delete('/:id', [
        // validar que el token venga y sea valido
        validarJWT,
        // validar mongoid valido
        check('id', 'El ID no es valido').isMongoId(),
        // validar el ID del posteo
        check('id').custom( validarIdPosteo ),
        // Validar los campos
        validarCampos
], posteosDelete);
// PUT: Dar like a una publicación
// /posteos/id de publicacion/like
router.put('/:id/like', putLikePosteo );
// exports
module.exports = router;