// nodemailer
const nodemailer = require("nodemailer");
// crear JWT
const { crearJWT } = require("../helpers/crear-jwt");

// envio de correo de verificacion de cuenta
const envioCorreoVerificacion = async ( nombre = '', correo = '' ) => {
    // transporte
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: process.env.MAILER_SECURE, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASSWORD,
      },
    });
    // crear el LINK con el token de verificacion
    // token
    // Para crear el token solo enviaremos como payload el correo
    const token = await crearJWT({ correo });
    // si no se generar el token mostramos un error
    if ( !token ) throw new Error('No se pudo generar el token');
    // LINK
    const link = `${ process.env.WEBSEVICE_URL }/auth/verificar-correo/${ token }`;

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Tlaxcala En Imágenes" <${process.env.MAILER_AUTH_USER}>`, // sender address
        to: `"${correo}"`, // list of receivers
        subject: "Confirmación de registro de cuenta", // Subject line
        text: `Hola ${ nombre }, por favor confirma tu registro a Tlaxcala En Imágenes.`, // plain text body
        html: `
          <h1>Valida tu correo electrónico</h1>
          <p>Haz click en el siguiente enlace o pegalo en un navegador web</p>
          <a href="${ link }">Valida tu correo: ${ correo }</a>
        `, // html body

    });
    // Para verificar por consola que se envio el mensaje
    // console.log("Message sent: %s", info.messageId);
}
// exports
module.exports = {
    envioCorreoVerificacion
}