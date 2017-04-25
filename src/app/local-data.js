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
          url: 'www.wearegettingmarried.com',
          date: 'Saturday 10th December 2016',
          time: '6pm until late',
          location: 'The Sir Chris Hoy Velodrome, Glasgow, Scotland',
          imageUrl: '/images/development/velodrome.jpg',
          email: '10golds@anticlockwise.com',
          moreInfo: '<div>It will be great!</div>',
          menu: {
            adult: {
              starter: [
                {
                  value: 'adult-meat',
                  label: 'Pork Pie',
                  description: 'with a rocket salad'
                },
                { value: 'adult-veg', label: 'Vegetable tart', description: 'on a bed of leaves' },
              ],
              main: [
                {
                  value: 'adult-meat',
                  label: 'Roast Beef',
                  description: 'with yorkshire pudding'
                },
                {
                  value: 'adult-veg',
                  label: 'Aubergine Parmigiana',
                  description: 'in a tomato and basil sauce'
                }
              ],
              dessert: [
                { value: 'adult-one', label: 'Sticky toffee pudding', description: 'with ice cream' },
                { value: 'adult-cake', label: 'Chocolate Cake', description: 'with cream' },
              ]
            },
            child: {
              starter: [
                { value: 'child-soup', label: 'Soup' }
              ],
              main: [
                { value: 'child-chicken', label: 'Chicken Nuggets' },
                { value: 'child-fish', label: 'Fish Fingers' }
              ],
              dessert: [
                { value: 'child-ice', label: 'Ice Cream' }
              ]
            }
          }
        });
      }
    });
};
