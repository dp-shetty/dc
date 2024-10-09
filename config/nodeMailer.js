const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

const sendMail = (to, subject, html) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: `"D-CHALIOS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error); // Reject the promise if there's an error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info); // Resolve the promise if email is sent
      }
    });
  });
};

module.exports = sendMail;
