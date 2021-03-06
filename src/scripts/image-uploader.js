//
// Script to upload images DB.
//
// Params:
// - filename   The name of an image to upload.
//

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const loadFile = (filename) => {
  const contentType = /\.png/.test(path) ? 'image/png' : 'image/jpeg';
  return {
    name: path.basename(filename),
    data: fs.readFileSync(filename),
    contentType
  };
};

MongoClient.connect(process.env.MONGODB_URI)
  .then((db) => {
    const images = db.collection('images');
    images.insertOne(loadFile(process.argv[2]));
    db.close();
  })
  .catch(err => console.log('Error connecting to MongoDB', err));
