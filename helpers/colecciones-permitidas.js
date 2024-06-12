// validar colecciones permitidas
// coleccion = coleccion que vienen en la URL del endpoint
// colecciones = a las colecciones que estan permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {
    // verificar que coleccion exista en colecciones
    const existeColeccion = colecciones.includes( coleccion );
    // si no esta incluida lanzamos un error
    if ( !existeColeccion ) throw new Error(`La coleccion: ${ coleccion } no esta permitida, se permiten: ${ colecciones }`);
    // retornamos un TRUE
    return true;
}
// exports
module.exports = {
    coleccionesPermitidas
}