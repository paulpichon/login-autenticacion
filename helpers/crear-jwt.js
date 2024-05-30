// jsonwebtoken
const jwt = require('jsonwebtoken');

// JWT_SEED
const JWT_SEED = process.env.JWT_SEED;

// Crear el JWT
// en el payload viene el objeto con informacion del usuario
// y como segundo argumento duration, ya que vamos a utilizar diferentes tipos expiracion del token a lo largo del programa
const crearJWT = async (payload, duration = '1h') => {
    // regresamos una promesa con el token generado
    return new Promise( (resolve, reject ) => {
        // crear el token
        jwt.sign( payload, JWT_SEED, { 
            expiresIn:  duration,
        }, function(err, token) {
            if ( err ) {
                // console.log( err );
                reject('El token no se pudo generar');
            } else {
                resolve( token );
            }
          });
    });
}
// exports
module.exports = {
    crearJWT
}