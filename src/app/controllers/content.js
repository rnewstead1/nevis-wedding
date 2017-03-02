module.exports = (wedding) => {
  const invitation = (req, res) => wedding.getWeddingDetails()
    .then(result => res.json(result));

  return { invitation };
};
