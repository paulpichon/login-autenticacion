// Router Express
const { Router } = require('express');
// Cargar archivos
// actualizar imagen de usuario
// mostrar imagen de perfil
const { cargarArchivos, 
        actualizarImagen, 
        mostrarImagen 
} = require('../controllers/uploads');
// Express validator
const { check } = require('express-validator');
// validar campos
// validarArchivo
const { validarCampos, validarArchivoSubir } = require('../middlewares');
// colecciones permitidas
const { coleccionesPermitidas } = require('../helpers/colecciones-permitidas');
// const router
const router = Router();

// GET
// obtener la ruta de la imagen de perfil
router.get('/:coleccion/:id', [
    // validar que el mongo sea valido
    check('id', 'El ID debe ser un MongoID').isMongoId(),
    // validar la coleccion, notar que se mandan argumentos
    // podemos hacer lo siguiente
    // c = coleccion
    // ['usuarios'] ---> aqui se ponen las colecciones permitidas
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios']) ),
    validarCampos
], mostrarImagen);
// POST
// Subir archivos-imagenes
// middleware validarArchivoSubir
router.post('/', validarArchivoSubir, cargarArchivos);
// ruta para actualizar la imagen de perfil de usuario
// para el endpoint necesitamos el nombre de la coleccion de mongodb y el id del usuario al que se le va a actualizar la imagen de perfil
router.put('/:coleccion/:id', [
    // validar el archivo a subir
    validarArchivoSubir,
    // validar que el mongo sea valido
    check('id', 'El ID debe ser un MongoID').isMongoId(),
    // validar la coleccion, notar que se mandan argumentos
    // podemos hacer lo siguiente
    // c = coleccion
    // ['usuarios'] ---> aqui se ponen las colecciones permitidas
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios']) ),
    validarCampos
], actualizarImagen);
// exports
module.exports = router;