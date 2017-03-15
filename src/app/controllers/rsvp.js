const jwt = require('jsonwebtoken');

const submitValidation = (body) => {
  const submissionErrors = {};
  const guests = [];
  let foundError = false;

  if (!body.guests || body.guests.length === 0) {
    return [true, { _error: 'Please enter at least one guest' }];
  }

  if (!body.email) {
    return [true, { _error: 'Please enter an email address' }];
  }

  if (!/^\S+@\S+\.[A-Za-z0-9-]{2,}$/.test(body.email)) {
    return [true, { _error: 'Please enter a valid email address' }];
  }

  for (let ii = 0; ii < body.guests.length; ii++) {
    const guest = body.guests[ii];
    const guestErrors = {};
    if (!guest.name) {
      guestErrors.name = 'Please enter a name';
      foundError = true;
    }

    if (!guest.canCome) {
      guestErrors.canCome = 'Please enter a response';
      foundError = true;
    }

    guests[ii] = guestErrors;
  }

  if (guests.length !== 0) {
    submissionErrors.guests = guests;
  }

  return [foundError, submissionErrors];
};

module.exports = (db, emailSender) => {
  const save = (req, res) => {
    const [foundError, submissionErrors] = submitValidation(req.body);

    if (foundError) {
      return res.status(400).json(submissionErrors);
    }

    const userDetails = jwt.verify(req.cookies.id_token, process.env.SECRET);
    const phrase = userDetails.phrase;

    const collection = db.collection('guests');

    collection.findOne({ phrase }).then((rsvp) => {
      if (rsvp) {
        return res.status(400).json({ _error: 'Response already received' });
      }

      return collection.insertOne({ phrase: userDetails.phrase, rsvp: req.body })
        .then(() => emailSender.sendMail(req.body.email, req.body.guests))
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
    });
  };

  return { save };
};
