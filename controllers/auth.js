// controladores de AUTH
// verificar el correo enviado al usuario
const { verificarCorreoEnviado } = require("../email/servicios-autenticacion-correo");
// custom error
const { CustomError } = require("../errors/custom.errors");


// controlador de verificar correo por usuario
// se manda un link al correo del usuario que creo la cuenta
const verificarCorreo = ( req, res ) => {
    // DESESTRUCTURAMOS TOKEN
    const { token } = req.params;
    // 
    verificarCorreoEnviado( token )
        .then( () => res.json('Cuenta verificada') )
            // .catch( error => console.log( error, res ));
            .catch( error => {
                // Esto muestra un error en la consola, debemos mejorar este manjeo del error
                // si no se pudo resolver la verificacion de la cuenta mostramos un mensaje
                // console.log( error, res )
                console.log( error )
                // return res.status(500).json(error.message)
                // res.json('Token invalido o ha expirado')
            });
    

    // respuesta
    // res.json({
    //     token
    // });
}
// exports
module.exports = {
    verificarCorreo
}