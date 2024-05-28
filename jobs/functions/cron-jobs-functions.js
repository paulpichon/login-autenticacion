// modelo Usuario
const Usuario = require("../../models/usuario");
// IMPORTANTE!!
// El tiempo que dura el TOKEN debe ser igual al tiempo que hay de diferencia entre la fecha registrada por crear la cuenta y la fecha actual
// Por ejemplo si el token dura 2 horas, 2 horas debe de haber de diferencia entre la fecha_registro del usuario y la hora actual

// Funcion para eliminar las cuentas no verificadas por los usuarios, estas se eliminan cada 2 horas, la funcion verifica que la cuenta que esta siendo revisada tenga mas de 2 horas despues de haber sido creada, si ha pasado mas de 2 horas, se elimina fisicamente la cuenta/registro del usuario y debera volver a crear su cuenta desde 0
const eliminarRegistrosCuentasNoVerificadas = async () => {
    console.log("funcion iniciada");
    // fecha y horario actual
    const hoy = new Date();
    try {
        // buscar los registros que tengan el email_validated en false
        const usuarios = await Usuario.find({ email_validated : false });
        // hacemos un barrido de los registros para comparar aquellos que ya hayan pasado mas de 2 horas
        usuarios.forEach( async usuario => {
            // fecha que viene de la BD registrada por el usuario a la hora de crear la cuenta
            const usuarioFecha = new Date(usuario.fecha_registro);
            // diferencia de tiempo entre la fecha actual y la fecha que viene de la BD registrada por el usuario a la hora de crear la cuenta
            const difEnMilisegundos = hoy - usuarioFecha;
            // const diffInHours = difEnMilisegundos / (1000 * 60 * 60);
            // diferencia de tiempo en minutos
            const difEnMinutos = difEnMilisegundos / (1000 * 60);
            console.log(difEnMinutos, usuario._id);
            // validar si difEnMinutos es mayor a 2 horas
            if (difEnMinutos >= 60) {
                // En caso de que difEnMinutos sea mayor a 2 horas se eliminan los registros con email_validated:false
                console.log(`Registro con ID ${usuario._id} tiene más de 15 minutos desde que creo su cuenta.`);
                // Se elimina el documento fisicamente de la BD
                await Usuario.findByIdAndDelete( usuario._id );
            }
        });
    } catch (error) {
        // En caso de haber un error, se muestran en la consola
        console.error('Error al verificar los registros:', error);
    }

}
// exports
module.exports = {
    eliminarRegistrosCuentasNoVerificadas
}