module.exports = (db) => {
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

    const collection = db.collection('guests');
    return collection.insertOne(req.body)
      .then(() => {
        console.log('Saved ', req.body);
        return res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Save failed', err);
        return res.sendStatus(500);
      });
  };

  return { save };
};
