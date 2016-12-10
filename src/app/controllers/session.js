const jwt = require('jsonwebtoken');

module.exports = () => {
  const create = (req, res) => {
    if (req.body.phrase === 'phrase') {
      const user = { user: { phrase: req.body.phrase, names: 'Simon and Liz' } };
      const jwtToken = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
      user.id_token = jwtToken;

      res.status(200);
      return res.json({ user });
    }
    res.status(401);
    return res.json({ error: 'invalid name or phrase ' });
  };

  const verify = (req, res, next) => {
    if (!req.cookies.id_token) {
      return res.sendStatus(401);
    }
    jwt.verify(req.cookies.id_token, process.env.SECRET, (err) => {
      if (err) {
        return res.sendStatus(401);
      }
      return next();
    });
  };


  return { create, verify };
};
