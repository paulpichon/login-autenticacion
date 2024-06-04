// Google Library
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();
// esta funcion recibe el TOKEN lo inicializacion con comillas vacias para que si hay un error, este esté controlado.
async function googleVerify( token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    //const payload = ticket.getPayload();
    // Se desestructura payload
    const { name, picture, email } = ticket.getPayload();

    return {
        nombre_completo: {
            nombre: name.split(' ')[0],
            apellido: name.split(' ')[1]
        }, 
        imagen_perfil: picture, 
        correo: email
    }

}
// Exports
module.exports = {
    googleVerify
}