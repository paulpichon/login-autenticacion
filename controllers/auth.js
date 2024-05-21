// controladores de AUTH
// verificar el correo enviado al usuario
const { verificarCorreoEnviado } = require("../email/servicios-autenticacion-correo");


// controlador de verificar correo por usuario
// se manda un link al correo del usuario que creo la cuenta
const verificarCorreo = ( req, res ) => {
    // DESESTRUCTURAMOS TOKEN
    const { token } = req.params;
    // 
    verificarCorreoEnviado( token )
        .then( () => res.json('Cuenta verificada') )
            // .catch( error => console.log( error, res ));
    

    // respuesta
    // res.json({
    //     token
    // });
}
// exports
module.exports = {
    verificarCorreo
}