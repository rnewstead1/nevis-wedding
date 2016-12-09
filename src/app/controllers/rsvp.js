module.exports = (db) => {
  const save = (req, res) => {
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
