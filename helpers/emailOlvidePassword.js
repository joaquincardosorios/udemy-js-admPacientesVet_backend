import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token} = datos;
    
    // Enviar Email

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu contraseña',
        text: 'Reestablece tu contraseña',
        html: `<p> Hola: ${nombre}, ha solicitado rresestablecer su contraseña. </p>
            <p> Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a></p>
            <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    });
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword