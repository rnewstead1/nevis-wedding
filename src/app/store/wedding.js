module.exports = (db) => {
  const wedding = db.collection('wedding');

  return { getWeddingDetails: () => wedding.findOne() };
};
