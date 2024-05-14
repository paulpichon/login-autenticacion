// clase server
const Server = require('./models/server');
// dotenv
require('dotenv').config();

// crear una instancia de Server
const server = new Server();
// llamamos el metodo listen
server.listen();

