// Router Express
const { Router } = require('express');
// Controllers
const { posteosGet, 
        posteoGet, 
        posteosUsuarioGet,
        posteosPost, 
        posteosPut, 
        posteosDelete, 
} = require('../controllers/posteos');
// const router
const router = Router();

// Get obtener Posteos
router.get('/', posteosGet);
// Get obtener un posteo
router.get('/:id', posteoGet);
// Get posteos de usuario
router.get('/:idUsuario', posteosUsuarioGet);
// Crear un Post
router.post('/', posteosPost);
// Put - Actualizar un posteo
router.put('/:id', posteosPut);
// Delete -eliminar un posteo
router.delete('/:id', posteosDelete);
// exports
module.exports = router;