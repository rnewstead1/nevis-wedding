module.exports = (db) => {
  const landing = (req, res) => {
    const wedding = db.collection('wedding');

    return wedding.findOne()
      .then(result => res.json(result));
  };

  return { landing };
};
