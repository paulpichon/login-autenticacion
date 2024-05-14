// Express
const express = require('express');

// Server Class
class Server{

    // constructor
    constructor() {
        // app
        this.app = express();
        // port
        this.port = process.env.PORT ?? 3000;
        // Path usuarios
        this.usuariosPath = '/api/usuarios';


        // middlewares
        this.middlewares();
        // routes()
        this.routes();

    }
    // metodos
    // middlewares
    middlewares() {
        // archivos publicos
        this.app.use( express.static('public'));
    }
    // routers
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    // listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App escuchando el puerto ${ this.port }`);
        });
    }
}
// export
module.exports = Server;