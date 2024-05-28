// Este cron job hara la funcion de eliminar registros de usuarios que no validaron su cuenta
// cronJob.js
const { CronJob } = require('cron');
// Funcion para eliminar cuentas no verificadas por el usuario
const { eliminarRegistrosCuentasNoVerificadas } = require('./functions/cron-jobs-functions');

// Programar el cron job para que se ejecute cada 2 horas
const job = new CronJob('*/1 * * * *', eliminarRegistrosCuentasNoVerificadas, null, true, 'UTC');

console.log('Cron job programado.');
