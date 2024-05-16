const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendEmail(mailOptions) {
  const info = await transporter.sendMail({
    from: mailOptions.from, 
    to: mailOptions.to, 
    subject:mailOptions.subject, 
    text: mailOptions.text,
    html: mailOptions.html,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports=sendEmail