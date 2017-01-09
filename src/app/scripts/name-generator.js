//
// Script to add a set of names and phrases to the DB.
//
// Params:
// - filename   The name of a text file containing a list of guest names (ones
//              per line).
//
// A phrase for each guest is generated and stored with the name in the DB.
// If there are any existing phrases in the DB this script will not overwrite
// them.
//

const Moniker = require('moniker');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

require('dotenv').config();

const createLogins = guestList =>
  guestList.map(guest => ({ names: guest, phrase: Moniker.choose() }));

const readGuestList = (filename) => {
  const contents = fs.readFileSync(filename, 'utf8');
  return contents.split('\n').filter(line => line !== '');
};

MongoClient.connect(process.env.MONGODB_URI)
  .then((db) => {
    const phrases = db.collection('phrases');
    phrases.count()
      .then((count) => {
        if (count === 0) {
          const guestList = readGuestList(process.argv[2]);
          const newPhrases = createLogins(guestList);
          console.log('Adding new phrases to DB', newPhrases);
          phrases.insertMany(newPhrases);
        } else {
          console.log('Phrases is not empty. Remove existing phrases before adding new ones.');
        }
      })
      .then(() => db.close());
  })
  .catch(err => console.log('Error connecting to MongoDB', err));
