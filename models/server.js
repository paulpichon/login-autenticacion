// Express
const express = require('express');
// cors
const cors = require('cors');
// Conexion a la BD archivo database/config
const { mongoDbConnection } = require('../database/config');
// FileUpload - carga de archivos/imagenes
const fileUpload = require('express-fileupload');

// Server Class
class Server{

    // constructor
    constructor() {
        // app
        this.app = express();
        // port
        this.port = process.env.PORT ?? 3000;
        // Paths
        this.paths = {
            // path auth
            auth:     '/api/auth',
            // Path usuarios
            usuarios: '/api/usuarios',
            // carga de archivos-imagenes
            uploads: '/api/uploads',
            // Path posteos
            posteos: '/api/posteos'
        }
        


        // conexion a la BD
        this.conectarBD();
        // middlewares
        this.middlewares();
        // routes()
        this.routes();

    }
    // metodos
    // conexion a la BD
    async conectarBD() {
        await mongoDbConnection();
    }
    // middlewares
    middlewares() {
        // CORS
        this.app.use( cors() );
        // archivos publicos
        this.app.use( express.static('public'));
        // leer y parsear el JSON
        this.app.use( express.json() );
        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            // desactivamos useTempFiles, ya que necesitamos usar el buffer que viene en la imagen, y si activamos useTempFiles el buffer viene vacio
            // useTempFiles : true,
            tempFileDir : '/tmp/',
            // crear carpeta si es que no existe a la hora de subir un archivo, debemos tener cuidado ya que se podrian crear carpetas que no necesitamos
            createParentPath: true,
        }));
    }
    // routers
    routes() {
        // path auth
        this.app.use(this.paths.auth, require('../routes/auth'));
        // path usuarios
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        // path uploads
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        // path posteos
        this.app.use(this.paths.posteos, require('../routes/posteos'));
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