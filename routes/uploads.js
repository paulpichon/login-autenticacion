// Router Express
const { Router } = require('express');
// Crgar archivos
const { cargarArchivos } = require('../controllers/uploads');
// const router
const router = Router();

// POST
// Subir archivos-imagenes
router.post('/', cargarArchivos);

// exports
module.exports = router;