// Conexion a la BD MONGODB
const mongoose = require('mongoose');

// funcion que hace la conexion a la BD
const mongoDbConnection = async () => {
    try {
        // conexion a la BD
        await mongoose.connect( process.env.MONGODB_CONNECTION )
            .then(() => console.log('BD en linea.'));

    } catch (error) {
        console.log( error );
        throw new Error('No se pudo conectar a la BD, verificar con soporte técnico.');
    }
}
// exports
module.exports = {
    mongoDbConnection
}