const { expect } = require('chai');
const contentBuilderCtr = require('../../../src/app/email/content-builder');

describe('content-builder', () => {
  const contentBuilder = contentBuilderCtr();
  const weddingDetails = {
    brideAndGroom: 'Jason and Laura',
    url: 'http://www.wearegettingmarriedupamountain.com',
    menu: {
      adult: {
        starter: [
          {
            value: 'adult-meat',
            label: 'Pork Pie',
            description: 'with a rocket salad'
          }
        ],
        main: [
          {
            value: 'adult-meat',
            label: 'Roast Beef',
            description: 'with yorkshire pudding'
          }
        ],
        dessert: [
          { value: 'adult-one', label: 'Sticky toffee pudding', description: 'with ice cream' },
        ]
      },
      child: {
        starter: [
          {
            value: 'child-starter',
            label: 'Soup'
          }
        ],
        main: [
          {
            value: 'child-main',
            label: 'Spaghetti Hoops'
          }
        ],
        dessert: [
          {
            value: 'child-dessert',
            label: 'Ice cream'
          }
        ]
      }
    }
  };

  describe('email to guests', () => {
    const { guestContent } = contentBuilder;

    it('should include guest names in response', () => {
      const html = guestContent.html(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        dessert: 'adult-one'
      }, {
        name: 'G',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        dessert: 'adult-one'
      }, { name: 'Quintana', canCome: 'yes', starter: 'adult-meat', main: 'adult-meat', dessert: 'adult-one' }]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('Froome, G and Quintana');
    });

    it('should include "We are delighted..." in html if all guests can come', () => {
      const html = guestContent.html(weddingDetails, [
        {
          name: 'Froome',
          canCome: 'yes',
          starter: 'adult-meat',
          main: 'adult-meat',
          dessert: 'adult-one'
        },
        { name: 'G', canCome: 'yes', starter: 'adult-meat', main: 'adult-meat', dessert: 'adult-one' }
      ]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('We are delighted');
    });

    it('should not include "We are delighted..." in html if some guests cannot come', () => {
      const html = guestContent.html(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        dessert: 'adult-one'
      },
        { name: 'G', canCome: 'no' }]);
      expect(html).not.to.contain('undefined');
      expect(html).not.to.contain('We are delighted');
      expect(html).to.contain('We are sorry that G cannot attend');
    });

    it('should include "We are sorry..." in html if all guests cannot come', () => {
      const html = guestContent.html(weddingDetails, [{ name: 'Froome', canCome: 'no' }, { name: 'G', canCome: 'no' }]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('We are sorry');
    });

    it('should include food choice in guest response', () => {
      const html = guestContent.html(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        dessert: 'adult-one'
      }]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('Pork Pie with a rocket salad');
      expect(html).to.contain('Roast Beef with yorkshire pudding');
      expect(html).to.contain('Sticky toffee pudding with ice cream');
    });

    it('should stringify the html content for the text response', () => {
      const text = guestContent.text(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        dessert: 'adult-one'
      }]);
      expect(text).not.to.contain('undefined');
      expect(text).to.contain('DEAR FROOME');
      expect(text).to.contain('We are delighted');
      expect(text).to.contain('Pork Pie with a rocket salad');
      expect(text).to.contain('Roast Beef with yorkshire pudding');
      expect(text).to.contain('Sticky toffee pudding with ice cream');
    });

    it('should handle a menu selection that has no description', () => {
      const html = guestContent.html(weddingDetails, [{
        name: 'Little Froome',
        canCome: 'yes',
        childMenu: true,
        starter: 'child-starter',
        main: 'child-main',
        dessert: 'child-dessert',
      }]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('Soup');
      expect(html).to.contain('Spaghetti Hoops');
      expect(html).to.contain('Ice cream');
    });

    it('should get single item from db if a course is missing', () => {
      const weddingWithSingleMenuItems = {
        brideAndGroom: 'Jason and Laura',
        url: 'http://www.wearegettingmarriedupamountain.com',
        menu: {
          adult: {
            starter: [
              {
                value: 'starter',
                label: 'Soup',
                description: 'with crusty bread'
              }
            ],
            main: [
              {
                value: 'main',
                label: 'Spaghetti Bolognese',
                description: 'with parmesan cheese'
              }
            ],
            dessert: [
              {
                value: 'Apple dessert',
                label: 'Apple crumble',
                description: 'with custard'
              }
            ]
          }
        }
      };
      const html = guestContent.html(weddingWithSingleMenuItems, [{
        name: 'Froome',
        canCome: 'yes'
      }]);
      expect(html).not.to.contain('undefined');
      expect(html).to.contain('Soup with crusty bread');
      expect(html).to.contain('Spaghetti Bolognese with parmesan cheese');
      expect(html).to.contain('Apple crumble with custard');
    });
  });
});
