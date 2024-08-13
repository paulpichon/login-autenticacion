// Path
const path = require('path');
// UUID
const { v4: uuidv4 } = require('uuid');
// funcion para redimensionar las imagenes
const { redimensionarImagen } = require('./redimension-imagenes');
// como argumentos podemos recibir files 
// como segundo argumento ponemos las extensiones validas, de esta forma podriamos llamar la funcion subirArchivo y cambiar las extensiones si es que asi lo queremos por ejemplo si queremos validar archivos de texto .txt .pdf. etc etc
// carpeta: la carpeta es donde se guardara el archivo subido
// newWidth y newHeight: How many pixels high the resultant image should be. Use null or undefined to auto-scale the height to match the width.
// https://sharp.pixelplumbing.com/api-resize
// Se manda las dimensiones de la imagen ya que hay otra funcion para la imagen de perfil que usa otras medidas de imagen
const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '', newWidth, newHeight) => {
    return new Promise((resolve, reject ) => {
        // VALIDAR LA EXTENSION DEL ARCHIVO
        // esto nos crea un array/arreglo
        const nombreCortado = files.name.split('.');
        // extension
        // la extension seria la ultima posicion del arreglo nombreCortado
        const extension = nombreCortado[ nombreCortado.length - 1];
        // VALIDAR LA EXTENSION DEL ARCHIVO
        // validar estension
        if ( !extensionesValidas.includes( extension ) ) {
            // si la extension del archivo subido no esta dentro del arreglo, se muestra un error
            return reject(`La extension ${ extension } no es permitida: ${ extensionesValidas }`);
        }
        // UBICAR Y CAMBIAR EL NOMBRE DEL ARCHIVO
        // Nombre del archivo mas la extension
        // uuid() ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const nombreTemp = `${ uuidv4() }.${ extension }`;

        // nombre de la ruta
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        // REDIMENSIONAMOS LA IMAGEN CON NUEVAS MEDIDAS
        // los argumentos que espera son los siguientes:
        // files: imagen a redimensionar
        // newWidth = el nuevo ancho
        // newHeight = el nuevo alto
        // uploadPath = el nombre de la ruta donde se guardara
        redimensionarImagen( files, newWidth, newHeight, uploadPath);
        // usar el metodo mv() para cambiar el archivo a cualquier parte de nuestro servidor
        files.mv(uploadPath, (err) => {
            // si hay algun error
            if (err) reject( err );
            // si todo sale bien
            resolve( nombreTemp );
        });
    });
}
// exports
module.exports = {
    subirArchivo
}