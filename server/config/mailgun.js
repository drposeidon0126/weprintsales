const mg = require("mailgun-js");
const nodemailer = require("nodemailer");

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 3000,
  secure: false, // Set to true if using SSL/TLS
});

const sendMailgunMail = (
  sender_email,
  receiver_email,
  email_subject,
  email_body
) => {
  const data = {
    from: sender_email,
    to: receiver_email,
    subject: email_subject,
    text: email_body,
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) console.log(error);
    else console.log(body);
  });
};

// let sender_email = "sender@gmail.com";
// let receiver_email = "receiver@gmail.com";
// let email_subject = "Mailgun Demo";
// let email_body = "Greetings from geeksforgeeks";

// // User-defined function to send email
// sendMail(sender_email, receiver_email, email_subject, email_body);

const sendPayercutMail = (
  sender_email,
  receiver_email,
  email_subject,
  email_body
) => {
  const data = {
    from: sender_email,
    to: receiver_email,
    subject: email_subject,
    text: email_body,
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMailgunMail, sendPayercutMail };
