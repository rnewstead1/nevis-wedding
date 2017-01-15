const jwt = require('jsonwebtoken');

module.exports = (db, emailSender) => {
  const save = (req, res) => {
    // Dummy validation error
    if (!req.body.guests[0].name.includes(' ')) {
      const guests = [];
      guests[0] = {};
      guests[0].name = 'Please enter your full name';
      const submissionErrors = {};
      submissionErrors.guests = guests;
      submissionErrors._error = 'Server side validation error';

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
