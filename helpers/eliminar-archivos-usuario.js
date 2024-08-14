// Funcion para eliminar los archivos del usuario
// en teoria deberiamos poder eliminar todas las imagenes que un usuario suba, desde imagenes de perfil, hasta imagenes que suba el usuario a su cuenta
// Path
const path = require('path');
// filesystem
const fs   = require('fs');
// Modelo Usuario
const Usuario = require("../models/usuario")

// carpeta, imagen, id usuario
const eliminarArchivosUsuario = async ( id ) => {
    // buscar el nombre de su imagen de perfil en la BD
    const { imagen_perfil } = await Usuario.findById( id );
    // eliminar imagen de perfil
    // nos aseguramos que el nombre de la imagen del perfil no sea la que viene por default
    if ( imagen_perfil !== 'assets/no-image.jpg' ) {
        // si existe hay que borrar la imagen del servidor
        // se construye el path de la imagen a borrar
        const pathImagen = path.join(__dirname, '../uploads/imagen_perfil_usuarios/',imagen_perfil);
        // verificar si existe la imagen fisicamente
        if ( fs.existsSync( pathImagen )) {
            // si existe la imagen, la borramos
            fs.unlinkSync( pathImagen );
        }
    }
}
// exports
module.exports = {
    eliminarArchivosUsuario
}