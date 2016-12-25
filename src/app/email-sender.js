const nodemailer = require('nodemailer');

module.exports = () => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const init = () => (process.env.SHOULD_EMAIL ? transporter.verify() : Promise.resolve());

  const htmlGuests = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `<p>${next.name} can come.</p><p>Food choice: ${next.foodChoice}</p>`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}<p>Dietary requirements: ${next.dietaryReqs}</p>`;
      }
    } else {
      nextGuest = `<p>${next.name} cannot come.</p>`;
    }
    return `${first}<hr>${nextGuest}`;
  }, []);

  const plainText = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `${next.name} can come.\nFood choice: ${next.foodChoice}`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}\nDietary requirements: ${next.dietaryReqs}`;
      } else {
        nextGuest = `${next.name} cannot come`;
      }
    }
    return `${first}\n\n${nextGuest}`;
  }, []);

  const names = guests => guests.map(guest => guest.name).reduce((first, next) => `${first} and ${next}`);

  const sendMail = (guests) => {
    const mailData = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENTS,
      subject: `Nevis Wedding RSVP: ${names(guests)}`,
      text: plainText(guests),
      html: `<html><body>${htmlGuests(guests)}</body></html>`
    };

    return process.env.SHOULD_EMAIL ? transporter.sendMail(mailData) : Promise.resolve();
  };

  return { init, sendMail };
};
