// Path
const path = require('path');
// UUID
const { v4: uuidv4 } = require('uuid');

// Hleper Subir archivo
// como argumentos podemos recibir files 
// se podria desestructurar directamente ({ archivo })
// como segundo argumento ponemos las extensiones validas, de esta forma podriamos llamar la funcion subirArchivo y cambiar las extensiones si es que asi lo queremos por ejemplo si queremos validar archivos de texto .txt .pdf. etc etc
// carpeta: la carpeta es donde se guardara el archivo subido
const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise((resolve, reject ) => {
        if ( files ) {
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
            // usar el metodo mv() para cambiar el archivo a cualquier parte de nuestro servidor
            files.mv(uploadPath, (err) => {
                // si hay algun error
                if (err) reject( err );
                // si todo sale bien
                resolve( nombreTemp );
            });
        }
        // verificar que si no viene nada en !req.files.archivo mostramos una alerta
        // esto es lo que yo estoy esperando en mi backend --> req.files.archivo
        // tambien se podria poner en el IF de arriba pero queda un poco mas visible lo que queremos de esta forma - pero es practicamente lo mismo
        // if (!req.files.archivo ) {
        //     return res.status(400).json({msg: 'No hay archivos que subir.'});
        // }
        // nombre de mi propiedad
        // const { archivo, imagen_perfil } = files;
        // if ( archivo ) {
        //     // VALIDAR LA EXTENSION DEL ARCHIVO
        //     // esto nos crea un array/arreglo
        //     const nombreCortado = archivo.name.split('.');
        //     // extension
        //     // la extension seria la ultima posicion del arreglo nombreCortado
        //     const extension = nombreCortado[ nombreCortado.length - 1];
        //     // VALIDAR LA EXTENSION DEL ARCHIVO
        //     // validar estension
        //     if ( !extensionesValidas.includes( extension ) ) {
        //         // si la extension del archivo subido no esta dentro del arreglo, se muestra un error
        //         return reject(`La extension ${ extension } no es permitida: ${ extensionesValidas }`);
        //     }
        //     // UBICAR Y CAMBIAR EL NOMBRE DEL ARCHIVO
        //     // Nombre del archivo mas la extension
        //     // uuid() ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        //     const nombreTemp = `${ uuidv4() }.${ extension }`;

        //     // nombre de la ruta
        //     const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
        //     // usar el metodo mv() para cambiar el archivo a cualquier parte de nuestro servidor
        //     archivo.mv(uploadPath, (err) => {
        //         // si hay algun error
        //         if (err) reject( err );
        //         // si todo sale bien
        //         resolve( nombreTemp );
        //     });
        // }
    
    });
}
// exports
module.exports = {
    subirArchivo
}