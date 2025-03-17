require("dotenv").config();
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});


const sendMail = async (email, subject, message) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"KnowYourKOL" <${EMAIL}>`, // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info;
}

module.exports = sendMail;