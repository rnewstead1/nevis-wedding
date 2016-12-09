module.exports = () => {
  const authenticate = (req, res) => {
    if (req.body.phrase === 'phrase') {
      res.status(200);
      return res.json({ user: { id_token: 'token', names: 'Simon and Liz' } });
    }
    res.status(401);
    return res.json({ error: 'invalid name or phrase ' });
  };

  return { authenticate };
};
