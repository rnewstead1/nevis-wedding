const nodemailer = require('nodemailer');

module.exports = (db) => {
  const emailFromAddress = process.env.EMAIL_USER;
  const emailFromPassword = process.env.EMAIL_PASS;
  const emailToOwnersAddress = process.env.EMAIL_RECIPIENTS;
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailFromAddress,
      pass: emailFromPassword
    }
  };
  const shouldEmail = process.env.SHOULD_EMAIL;
  const wedding = db.collection('wedding');

  const transporter = nodemailer.createTransport(smtpConfig);

  const htmlGuestSummary = guests => guests.reduce((first, next) => {
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

  const foodChoices = guests => guests.reduce((first, next) => {
    let nextGuest;
    if (next.canCome === 'yes') {
      nextGuest = `<p>${next.name}: ${next.foodChoice}</p>`;
      if (next.hasDiet === 'yes') {
        nextGuest = `${nextGuest}<p>Dietary requirements: ${next.dietaryReqs}</p>`;
      }
    }
    return `${first}<hr>${nextGuest}`;
  }, []);

  const textGuestSummary = guests => guests.reduce((first, next) => {
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

  const emailToOwners = guests => ({
    from: emailFromAddress,
    to: emailToOwnersAddress,
    subject: `Nevis Wedding RSVP: ${names(guests)}`,
    text: textGuestSummary(guests),
    html: `<html><body>${htmlGuestSummary(guests)}</body></html>`
  });

  const allGuestsCanCome = guests => guests.filter(guest => guest.canCome === 'no').length === 0;

  const allGuestsCannotCome = guests => guests.filter(guest => guest.canCome === 'yes').length === 0;

  const guestResponse = (weddingDetails, guests) => {
    let response = '<html><body><p>Thank you for RSVPing to our wedding.</p>';
    if (allGuestsCannotCome(guests)) {
      response = `${response}<p>We are sorry you are unable to attend</p>`;
    } else {
      if (allGuestsCanCome) {
        response = `${response}<p>We are delighted you can attend.</p>`;
      }
      response = `${response}<p>We have received your food choices as detailed below:</p>${foodChoices(guests)}<p>Please contact us if you need to amend your choices.</p>`;
    }
    return `${response}<p>From, ${weddingDetails.brideAndGroom}</p></p></body></html>`;
  };

  const emailToGuests = (contactEmail, guests, weddingDetails) => ({
    from: emailFromAddress,
    to: contactEmail,
    subject: `${weddingDetails.brideAndGroom}'s wedding RSVP`,
    text: `Thank you for RSVPing to our wedding.\nFrom, ${weddingDetails.brideAndGroom}`,
    html: guestResponse(weddingDetails, guests)
  });

  const sendMail = (contactEmail, guests) =>
    wedding.findOne()
      .then(weddingDetails =>
        Promise.all([
          transporter.sendMail(emailToOwners(guests)),
          transporter.sendMail(emailToGuests(contactEmail, guests, weddingDetails))
        ]));

  return shouldEmail ? transporter.verify().then(() => Promise.resolve({ sendMail })) : Promise.resolve({ sendMail: () => Promise.resolve() });
};
