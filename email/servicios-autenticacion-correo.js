// nodemailer
const nodemailer = require("nodemailer");
// crear JWT
const { crearJWT } = require("../helpers/crear-jwt");
// validar el JWT
const { validarJWT } = require("../helpers/validar-jwt");
// modelo de usuario
const Usuario = require("../models/usuario");

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
          <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <style>
                    p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                    h1{ font-size: 30px !important;}
                    h2{ font-size: 25px !important;}
                    h3{ font-size: 18px !important;}
                    h4{ font-size: 16px !important;}
                    p, a{font-size: 15px !important;}

                    .claseBoton{
                        width: 30%;
                            background-color: #fcae3b;
                            border: 2px solid #fcae3b;
                            color: black; 
                            padding: 16px 32px;
                            text-align: center;
                            text-decoration: none;
                            font-weight: bold;
                            display: inline-block;
                            font-size: 16px;
                            margin: 4px 2px;
                            transition-duration: 0.4s;
                            cursor: pointer;
                    }
                    .claseBoton:hover{
                        background-color: #000000;
                        color: #ffffff;
                    }
                    .imag{
                        width: 20px;
                        height: 20px;
                    }
                    .contA{
                        margin: 0px 5px 0 5px;
                    }
                    .afooter{
                        color: #ffffff !important; 
                        text-decoration: none;
                        font-size: 13px !important;
                    }
                </style>
            </head>
            <body>
                <div style="width: 100%; background-color: #e3e3e3;">
                    <div style="padding: 20px 10px 20px 10px;">
                        <!-- Imagen inicial -->
                        <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                            <img src="/public/images/pretwor.png" alt="" style="width: 200px; height: 60px;">
                        </div>
                        <!-- Imagen inicial -->

                        <!-- Contenido principal -->
                        <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                            <h1>Titulo de la notificación</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit augue, venenatis porta tellus bibendum 
                                consequat ultricies nec fringilla sagittis, varius elementum et eget vel taciti blandit. Neque 
                                fusce hac magna ligula ultricies gravida facilisi eget molestie, vivamus sodales ornare faucibus 
                                sollicitudin netus mauris odio, tortor iaculis quisque penatibus convallis posuere nostra volutpat.
                                Primis urna laoreet donec aliquet id placerat natoque fusce, habitant volutpat ridiculus at massa nullam eget, 
                                penatibus parturient a in purus vulputate per. Erat cras elementum facilisi eleifend etiam cursus, mus sed dictum et justo, 
                                penatibus fusce sociosqu aliquam conubia.
                            </p>
                            <a href="${ link }">Valida tu correo: ${ correo }</a>

                            <!-- Gracias -->
                            <p>Gracias por tu tiempo.</p>
                            <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo AquíEstoy</p>

                            <!-- Botón -->
                            <a class="claseBoton" href="https://www.aquiestoy.mx/">AquíEstoy</a>
                        </div>
                        <!-- Contenido principal -->

                        <!-- Footer -->
                        <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                            <!-- Redes sociales -->
                            <a href="https://www.facebook.com/pretwor" class="contA"><img src="/public/images/fb.png" class="imag" /></a>
                            <a href="https://www.instagram.com/pretwor/" class="contA"><img src="/public/images/ig.png" class="imag" /></a>
                            <a href="https://wa.me/573224294332" class="contA"><img src="/public/images/wapp.png" class="imag" /></a>
                            <a href="mailto:contacto@pretwor.com" class="contA"><img src="/public/images/em.png" class="imag" /></a>
                            <!-- Redes sociales -->

                            <h4>Soporte</h4>
                            <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                                Comunícate con nosotros por los siguientes medios:<br>
                                Correo: <a class="afooter" href="mailto:info@aquiestoy.mx">info@aquiestoy.mx</a><br>
                                Whatsapp: <a class="afooter" href="https://wa.me/2225214696">+52 22 25 21 46 96</a><br>
                            </p>
                            <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                © 2024 AquíEstoy, todos los derechos reservados.
                            </p>
                        </div>
                        <!-- Footer -->



                    </div>
                </div>
            </body>
            </html>
        `, // html body

    });
    // Para verificar por consola que se envio el mensaje
    // console.log("Message sent: %s", info.messageId);
}

// Servicio para poder verificar el CUENTA del usuario
const verificarCorreoEnviado = async ( token = '') => {

    // payload
    const payload = await validarJWT( token );
    // si no hay payload
    if ( !payload ) throw new Error('Unauthorized: Token invalido o ha expirado.');

    // desestructuramos payload
    const { correo } = payload;
    // en caso de que no venga el correo en el token, pero esto no deberia de fallar!! y si falla es un poblema del backend
    if ( !correo ) throw new Error('Internal Server Error: Correo no esta en el token');

    // buscamos al usuario por medio del correo
    const usuario = await Usuario.findOne({ correo });
    // verificar si existe el usuario
    // esto tampoco deberia de fallar!!! y si falla es un poblema del backend
    if ( !usuario ) throw new Error('Internal Server Error: correo no existe');

    // si todo sale bien
    usuario.email_validated = true;
    // guardar el cambiuo
    await usuario.save();
    // no hace falta poner el return
    return true;
}



// exports
module.exports = {
    envioCorreoVerificacion,
    verificarCorreoEnviado
}