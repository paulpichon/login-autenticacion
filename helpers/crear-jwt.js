// jsonwebtoken
const jwt = require('jsonwebtoken');

// JWT_SEED
const JWT_SEED = process.env.JWT_SEED;

// Crear el JWT
const crearJWT = async ( payload ) => {
    // regresamos una promesa con el token generado
    return new Promise( (resolve, reject ) => {

        // payload 
        // const payload = { uid, correo };

        jwt.sign(payload, JWT_SEED, { 
            expiresIn:  '2h'//el token expira en 2 horas
        }, function(err, token) {
            if ( err ) {
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