// Path
const path = require('path');
// filesystem
const fs   = require('fs');
// response 
const { response } = require("express");
// Usuario model
const Usuario = require("../models/usuario");
// subir archivos
const { subirArchivo } = require("../helpers/subir-archivo");

// funcion para cargar/subir imagenes
const cargarArchivos = async ( req, res ) => {
    // El REJECT que devuelve el archivo subir-archivo.js nos devuelve un error que hace que reviente nuestra aplicacion en consola nos muestra un error muy feo, esto lo podemos manejar poniendo un try y un catch
    try {
        // llamamos la funcion para subir el archivo
        // path completo del archivo
        // ARGUMENTOS ---> archivo & extensiones & nombre de la carpeta
        // se usan las extensiones por defecto y la carpeta seguira siendo la misma asi que no se manda nombre de carpeta
        // nombre de la imagen
        // mandar diferentes extensiones, se podria crear un arreglo con diferentes extensiones y mandarlo como argumento
        // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        // en caso de que no mandemos algun argumento DEBEMOS poner UNDEFINED
        // newWidth y newHeight: How many pixels high the resultant image should be. Use null or undefined to auto-scale the height to match the width.
        const nombre = await subirArchivo( req.files, undefined, 'imgs', newWidth = undefined, newWidth = undefined );
        // respuesta
        res.json({ nombre });

    } catch (msg) {
        return res.status(400).json({ msg });
    }    
}

// funcion para actualizar la imagen de perfil de usuario
const actualizarImagen = async ( req, res = response) => {
    
    try {
        // obtenemos el id de usuario y el nombre de la coleccion
        const { id, coleccion } = req.params;
        // modelo
        let modelo;
        // se valida que el ID de usuario exista en la coleccion
        switch ( coleccion ) {
            case 'usuarios':
                // buscamos el usuario con el ID
                modelo = await Usuario.findById( id );
                // si no existe
                if ( !modelo ) {
                    return res.status( 400 ).json({
                        msg: `No existe un usuario con el ID: ${ id }`
                    });
                } 

            break;
        
            default:
                return res.status( 500 ).json({ msg: 'Verificar si hay alguna validacion que se nos olvido'});
        }

        // LIMPIAR LAS IMAGENES PREVIAS
        // verificar si existe modelo.imagen_perfil en la BD
        if ( modelo.imagen_perfil ) {
            // si existe hay que borrar la imagen del servidor
            // se construye el path de la imagen a borrar
            const pathImagen = path.join(__dirname, '../uploads/imagen-perfil-usuarios/', modelo.imagen_perfil);
            // verificar si existe la imagen fisicamente
            if ( fs.existsSync( pathImagen )) {
                // si existe la imagen, la borramos
                fs.unlinkSync( pathImagen );
            }
        }

        // subir archivo
        // recordemos que el tercer argumento de subirArchivo() es el nombre de la carpeta que en este caso seria el de la coleccion
        // const nombre = await subirArchivo( req.files, undefined, coleccion );
        let nombre;
        if ( !Array.isArray( req.files.archivo ) ) {
            const archivos = [req.files.archivo];
            // console.log( archivos, 'archivos mandados' );
            const archivo = archivos.at(0);
            // console.log( archivo, 'archivo prueba' );
            // nombre = await subirArchivo( archivo, undefined, coleccion );
            // newWidth y newHeight: How many pixels high the resultant image should be. Use null or undefined to auto-scale the height to match the width.
            // https://sharp.pixelplumbing.com/api-resize
            // Se manda las dimensiones de la imagen ya que hay otra funcion para la imagen de perfil que usa otras medidas de imagen
            nombre = await subirArchivo( archivo, undefined, 'imagen-perfil-usuarios', newWidth = 200, newHeight = 200 );
            // respuesta
        }
        // asignamos el nombre del archivo al modelo.imagen_perfil   
        modelo.imagen_perfil = nombre;
        // fecha de actualizacion del registro
        modelo.fecha_actualizacion = Date.now();
        // lo guardamos en la BD
        await modelo.save();

        // respuesta
        res.json({ modelo });
    } catch (msg) {
        return res.status(400).json({ msg });
    }

}
// funcion para mostrar imagen de perfil
const mostrarImagen = async ( req, res ) => {
    
    // obtenemos el id de usuario y el nombre de la coleccion
    const { id, coleccion } = req.params;
    // modelo
    let modelo;
    // se valida que el ID de usuario exista en la coleccion
    // colecciones validas para mostrar imagenes:
    // imagen-perfil-usuarios   ----> imagenes de perfil de usuarios
    switch ( coleccion ) {
        case 'imagen-perfil-usuarios':
            // buscamos el usuario con el ID
            modelo = await Usuario.findById( id );
            // si no existe
            if ( !modelo ) {
                return res.status( 400 ).json({
                    msg: `No existe un usuario con el ID: ${ id }`
                });
            } 
        break;
    
        default:
            return res.status( 500 ).json({ msg: 'Verificar si hay alguna validacion que se nos olvido'});
    }

    // LIMPIAR LAS IMAGENES PREVIAS
    // verificar si existe modelo.imagen_perfil en la BD
    if ( modelo.imagen_perfil ) {
        // si existe hay que borrar la imagen del servidor
        // se construye el path de la imagen a borrar
        const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.imagen_perfil);
        // verificar si existe la imagen fisicamente
        if ( fs.existsSync( pathImagen )) {
            // si existe la imagen, retornamos la imagen
            return res.sendFile( pathImagen );
        }
    }
    // NO IMAGE FOUND
    const noImageFound = path.join(__dirname, '../assets/no-image.jpg');
    // retornamos en caso de no haber imagen de perfil
    res.sendFile( noImageFound )

}
// exports
module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen
}