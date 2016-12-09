module.exports = (req, res, next) => {
  if (req.cookies.id_token === 'token') {
    return next();
  }
  return res.sendStatus(401);
};
