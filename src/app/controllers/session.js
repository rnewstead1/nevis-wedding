const jwt = require('jsonwebtoken');

module.exports = (db) => {
  const create = (req, res) => {
    const collection = db.collection('phrases');
    collection.findOne({ phrase: req.body.phrase })
      .then((found) => {
        if (!found) {
          res.status(401);
          return res.json({ error: 'invalid name or phrase ' });
        }
        const user = { phrase: found.phrase, names: found.names };
        const jwtToken = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });

        res.status(200);
        return res.json({ user: { names: user.names, id_token: jwtToken } });
      });
  };

  const verify = (req, res, next) => {
    if (!req.cookies.id_token) {
      return res.sendStatus(401);
    }
    jwt.verify(req.cookies.id_token, process.env.SECRET, (err, decrypted) => {
      if (decrypted.phrase && decrypted.names) {
        return next();
      }
      return res.sendStatus(401);
    });
  };


  return { create, verify };
};
