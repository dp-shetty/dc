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
  const mailOptions = {
    from: `"D-CHALIOS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return;
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
