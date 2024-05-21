// validar el JWT
// jsonwebtoken
const jwt = require("jsonwebtoken");

const validarJWT = ( token = '') => {

    return new Promise( (resolve) => {

        jwt.verify(token, process.env.JWT_SEED, 
            function(err, decoded) {
                // si hay un error devolvemos un resolve null
                if( err ) return resolve(null);
                // si se resuelve de forma exitosa regresamos el decoded
                resolve(decoded);
            });
    });
}

// exports
module.exports = {
    validarJWT
}