const fs = require('fs');

module.exports.writeFilesFromDb = (db) => {
  const images = db.collection('images');
  return images.find().toArray()
    .then(docs => docs.forEach((doc) => {
      const path = `public/images/${doc.name}`;
      console.log('Writing image file from database:', path);
      fs.writeFileSync(path, doc.data.buffer);
    }))
    .catch(err => console.error('Error saving image files', err));
};
