// nodemailer
const nodemailer = require("nodemailer");

// envio de correo de verificacion de cuenta
const envioCorreoVerificacion = async ( nombre = '',correo = '' ) => {
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

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Tlaxcala En Imágenes" <${process.env.MAILER_AUTH_USER}>`, // sender address
        to: `"${correo}"`, // list of receivers
        subject: "Confirmación de registro de cuenta", // Subject line
        text: `Hola ${ nombre }, por favor confirma tu registro a Tlaxcala En Imágenes.`, // plain text body
        html: "<b>Por favor haz click en el siguiente enlace para poder activar tu cuenta</b>", // html body
    });

  console.log("Message sent: %s", info.messageId);
}
// exports
module.exports = {
    envioCorreoVerificacion
}