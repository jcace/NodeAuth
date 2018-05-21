import nodemailer from 'nodemailer';

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'eaycgqjr3gcgjtbe@ethereal.email', // generated ethereal user
    pass: '69WtszrwkHx2Nk69S1', // generated ethereal password
  },
});

export const sendVerificationEmail = (jwt, email) => {
  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `Click here to activate account: <a href="http://localhost:8000/api/v1/activate</a> JWT: ${jwt}`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};
