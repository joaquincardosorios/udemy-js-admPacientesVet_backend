import nodemailer from 'nodemailer'

const emailRegistro = () => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "da1fe00b4881cf",
          pass: "40616f2d539ee1"
        }
    });
}

export default emailRegistro