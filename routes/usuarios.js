// Router Express
const { Router } = require('express');
// CONTROLLERS
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete 
} = require('../controllers/usuarios');
// const router
const router = Router();

// Get
router.get('/', usuariosGet);

// Post
router.post('/', usuariosPost);

// Put
router.put('/', usuariosPut);

// Delete
router.delete('/', usuariosDelete);
// exports
module.exports = router;