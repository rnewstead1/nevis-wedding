//
// Script to download the guest list.
//
// Uses the environment from .env.
//

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

require('dotenv').config();

MongoClient.connect(process.env.MONGODB_URI)
  .then((db) => {
    const guests = db.collection('guests');
    const guestList = [];
    const cannotCome = [];

    guests.find().toArray().then((responses) => {
      responses.forEach(response =>
        response.rsvp.guests.forEach((guest) => {
          if (guest.canCome === 'yes') {
            if (guest.childMenu) {
              guestList.push([guest.name, '', guest.main, '']);
            } else {
              guestList.push([guest.name, guest.starter, guest.main, guest.dessert]);
            }
          } else {
            cannotCome.push(guest.name);
          }
        }
        ));
      db.close();
    })
    .then(() => {
      const guestCount = guestList.length;
      guestList.unshift(['Name', 'Starter', 'Main', 'Dessert']);
      const data = guestList.map(row => row.join(',')).join('\n');
      fs.writeFileSync('guest_list.csv', data);
      fs.writeFileSync('rsvp_no.txt', cannotCome.join('\n'));
      console.log('Written', guestCount, 'menu choices to guest_list.csv');
      console.log('Another', cannotCome.length, 'guests cannot attend. Names have been written to rsvp_no.txt');
    });
  })
  .catch(err => console.log('Error connecting to MongoDB', err));
