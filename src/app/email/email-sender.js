const nodemailer = require('nodemailer');
const contentBuilder = require('./content-builder');

module.exports = (config, wedding) => {
  const { emailFromAddress, emailFromPassword, emailToOwnersAddress, shouldEmail } = config;
  const { getWeddingDetails } = wedding;
  const { ownerContent, guestContent } = contentBuilder();

  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailFromAddress,
      pass: emailFromPassword
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const emailToOwners = guests => ({
    from: emailFromAddress,
    to: emailToOwnersAddress,
    subject: ownerContent.subject(guests),
    text: ownerContent.text(guests),
    html: ownerContent.html(guests)
  });

  const emailToGuests = (contactEmail, guests, weddingDetails) => ({
    from: emailFromAddress,
    to: contactEmail,
    subject: guestContent.subject(weddingDetails),
    text: guestContent.text(weddingDetails),
    html: guestContent.html(weddingDetails, guests)
  });

  const sendMail = (contactEmail, guests) =>
    getWeddingDetails()
      .then(weddingDetails =>
        Promise.all([
          transporter.sendMail(emailToOwners(guests)),
          transporter.sendMail(emailToGuests(contactEmail, guests, weddingDetails))
        ])
      );

  return shouldEmail ? transporter.verify().then(() => Promise.resolve({ sendMail })) : Promise.resolve({ sendMail: () => Promise.resolve() });
};
