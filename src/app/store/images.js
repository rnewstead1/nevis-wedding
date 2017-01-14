const fs = require('fs');

const imagesPath = 'public/images/db';

module.exports.writeFilesFromDb = (db) => {
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
  }

  const images = db.collection('images');
  return images.find().toArray()
    .then(docs => docs.forEach((doc) => {
      const path = `${imagesPath}/${doc.name}`;
      console.log('Writing image file from database to', path);
      fs.writeFileSync(path, doc.data.buffer);
    }))
    .catch(err => console.error('Error saving image files', err));
};
