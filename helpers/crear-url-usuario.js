// Funcion para crear la URL del usuario
// Modelo de usuario
const Usuario = require("../models/usuario");

// Esta funcion se va a crear automaticamente al momento en que un usuario crea una cuenta de usuario, para crearla necesitamos de momento como parametro la propiedad nombre_completo
const crearUrlUsuarioPerfil = async ({ nombre, apellido }) => {
	// Quitar los acentos y convertirlos en minisculas
	const nombreSinAcentos = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	// Quitar los acentos y convertirlos en minisculas
	const apellidosSinAcentos = apellido.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	// separar la cadena por espacios y crear un arreglo
	let cadena = `${nombreSinAcentos} ${apellidosSinAcentos}`.split(' '); //[ 'nombre', 'apellidos' ] 
	// Unir las partes ---> "esteesunejemplodecomoquedarialaurl"
	let nuevaCadena = cadena.join('');
	// En programación y desarrollo web, un "slug" es una versión amigable de una cadena de texto que se usa generalmente en URLs para identificar de manera única una página web en particular de una manera legible y fácil de entender. Los slugs suelen derivarse del título de una página o artículo y se utilizan en lugar de identificadores numéricos o cadenas de texto largas que serían difíciles de leer y recordar.
	const baseUrl = nuevaCadena;
	// URL
	let url = baseUrl;
	// contador ---> este ira incrementando en 1
	let contador = 1;
	// mientras siga habiendo coincidencia de URL repetidas el contador se ira incrementando
	while ( Usuario.findOne({ url: url })) {
		// se forma la URL
		url = `${baseUrl}.${contador}`;
		// se incrementa
		contador++;
	}
	// retornamos la URL unica
	return url;
}
// exports
module.exports = {
		crearUrlUsuarioPerfil
}