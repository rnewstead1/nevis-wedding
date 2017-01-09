module.exports = (wedding) => {
  const landing = (req, res) => wedding.getWeddingDetails()
    .then(result => res.json(result));

  return { landing };
};
