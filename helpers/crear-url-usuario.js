// Funcion para crear la URL del usuario
// Modelo de usuario
const Usuario = require("../models/usuario");

// Esta funcion se va a crear automaticamente al momento en que un usuario crea una cuenta de usuario, para crearla necesitamos de momento como parametro la propiedad nombre_completo
const crearUrlUsuarioPerfil = async ({ nombre, apellido }) => {
    // Quitar los acentos y convertirlos en minisculas
    const nombreSinAcentos = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const apellidosSinAcentos = apellido.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let cadena = `${nombreSinAcentos} ${apellidosSinAcentos}`.split(' ');
    
    // let partes = cadena.split(' ');
    
    // Filtrar partes vacías para manejar múltiples espacios consecutivos o espacios finales
    cadena = cadena.filter(parte => parte !== '');
    
    // Unir las partes con guiones
    let nuevaCadena = cadena.join('-');

    const baseSlug = nuevaCadena;
    let slug = baseSlug;
    let suffix = 1;
  
    while (await Usuario.findOne({ url: slug })) {
      slug = `${baseSlug}-${suffix}`;
      suffix++;
    }
  
    return slug;
}
// async function checkUrlExists(url, nuevaCadena) {
//     // Simulación de URLs existentes en la base de datos
//     // const existingUrls = ["paul-pichon-fabian", "paul-pichon-fabian-1", "paul-pichon-fabian-2", "paul-pichon-fabian-3"];
//     const usuario = await Usuario.findOne({ url: nuevaCadena});
//     // console.log( [usuario.url], 'check' );
//     const existingUrls = [usuario.url]
//     return existingUrls.includes(url);
// }
// exports
module.exports = {
    crearUrlUsuarioPerfil
}