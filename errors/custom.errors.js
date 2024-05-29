// Errores personalizados

// Clase CustomError
class CustomError extends Error {
    // constructor
    constructor( statusCode, message
    ) {
        // extends
        super( message );
    }

    // metodos
    // Errores personalizados
    // Bad request
    static badRequest( message ) {
        return new CustomError(400, message);
    }
    // Unauthorized
    static unauthorized( message ) {
        return new CustomError(401, message);
    }
    // Forbidden
    static forbidden( message ) {
        return new CustomError(403, message);
    }
    // not found
    static notFound( message ) {
        return new CustomError(404, message);
    }
    // internal server
    static internalServer( message ) {
        return new CustomError(500, message);
    }

}
// exports
module.exports = {
    CustomError
}