module.exports = (db) => {
  const phrases = db.collection('phrases');
  phrases.count()
    .then((count) => {
      if (count === 0) {
        phrases.insertMany([
          { phrase: 'sky', names: 'Froome and G' },
          { phrase: 'movistar', names: 'Quintana' }
        ]);
      }
    });

  const wedding = db.collection('wedding');
  wedding.count()
    .then((count) => {
      if (count === 0) {
        wedding.insertOne({
          brideAndGroom: 'Jason and Laura',
          date: 'Saturday 10th December 2016',
          time: '18:30 until late',
          location: 'The Sir Chris Hoy Velodrome, Glasgow, Scotland',
          imageUrl: '/images/development/velodrome.jpg'
        });
      }
    });
};
