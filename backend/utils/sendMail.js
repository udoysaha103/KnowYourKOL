require("dotenv").config();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = process.env;
const config = require("./config");

// // for testing
// const wait = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("done")
//         }, ms)
//     })
// }

// const sendMail = async (name, email, code) => {
//     const result = await wait(3000);
//     return { message: result }
// }

const sendMail = async (name, email, code) => {

    const transporterConfig = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "BRACU Community",
            link: 'https://www.bracu.ac.bd/'
        }
    })

    const messageContent = {
        body: {
            name,
            intro: `Here is your verification code: ${code}.`,
            outro: `This code will expire in ${config.code.expiryTimeInMinuits} minuits. Put this code in the verification page in ${config.code.expiryTimeInMinuits} minuits to verify your account to continue.`
        }
    }

    const mail = MailGenerator.generate(messageContent)

    const message = {
        from: EMAIL,
        to: email,
        subject: "Your verification code for BRACU Community is " + code,
        html: mail
    }

    try {
        const result = await transporter.sendMail(message)
        return result
    } catch (err) {
        throw new Error(err.message)
    }

}


module.exports = sendMail;