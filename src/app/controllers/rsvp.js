const jwt = require('jsonwebtoken');

const submitValidation = (body) => {
  const submissionErrors = {};
  const guests = [];
  let foundError = false;

  if (body.guests.length === 0) {
    return [true, { _error: 'Please enter at least one guest' }];
  }

  for (let ii = 0; ii < body.guests.length; ii++) {
    const guest = body.guests[ii];
    const guestErrors = {};
    console.log('Guest is ', guest);
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
    console.log('errors are', guests);
    submissionErrors.guests = guests;
  } else {
    console.log('no errors', guests);
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
        .then(() => {
          console.log('Saved ', phrase, ' => ', req.body);
          return res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Something went wrong submitting rsvp details', err);
          return res.sendStatus(500);
        });
    });
  };

  const status = (req, res) => {
    const userDetails = jwt.verify(req.cookies.id_token, process.env.SECRET);
    const userPhrase = userDetails.phrase;
    const collection = db.collection('guests');

    collection.findOne({ phrase: userPhrase }).then((rsvp) => {
      if (rsvp) {
        return res.status(200).json({ rsvped: true });
      }
      return res.status(200).json({ rsvped: false });
    });
  };

  return { save, status };
};
