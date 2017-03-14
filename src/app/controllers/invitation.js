const jwt = require('jsonwebtoken');

module.exports = (db, wedding) => {
  const guests = db.collection('guests');

  const get = (req, res) => {
    const userDetails = jwt.verify(req.cookies.id_token, process.env.SECRET);
    const userPhrase = userDetails.phrase;

    return Promise.all([wedding.getWeddingDetails(), guests.findOne({ phrase: userPhrase })])
      .then(([weddingDetails, rsvp]) => res.json(Object.assign({}, { wedding: weddingDetails, rsvped: Boolean(rsvp) })));
  };

  return { get };
};
