// CRON JOBS
// Se ejecuta el cron job para eliminar registros de cuentas no verificadas
require('./jobs/eliminar-registros-cuentas-no-validadas');

// clase server
const Server = require('./models/server');
// dotenv
require('dotenv').config();
// crear una instancia de Server
const server = new Server();
// llamamos el metodo listen
server.listen();

