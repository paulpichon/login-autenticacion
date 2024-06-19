// funcion para redimensionar las imagenes
// Sharp, para redimensionar la imagen
const sharp = require('sharp');

// como argumentos pasamos el archivo y las dimenciones del archivo, y el uploadPath
// siempre deben de venir las dimensiones nuevas
const redimensionarImagen = async (files, newWidth, newHeight, uploadPath ) => {
    try {
        // redimensionar la imagen usando sharp
        await sharp( files.data )
        .resize(newWidth, newHeight, {
            fit: sharp.fit.inside, // Ajustar la imagen dentro del área especificada
            withoutEnlargement: true // Evitar agrandar la imagen si es más pequeña que las dimensiones dadas
        })
        // calidad para archivos jpeg
        .jpeg({ quality: 90 })
        // para png
        .png({ compressionLevel: 9 })
        .toFile(uploadPath);

    } catch (error) {
        console.log( error );
    }
}
// exports
module.exports = {
    redimensionarImagen
}