const { expect } = require('chai');
const contentBuilderCtr = require('../../../src/app/email/content-builder');

describe('content-builder', () => {
  const contentBuilder = contentBuilderCtr();
  const weddingDetails = {
    brideAndGroom: 'Jason and Laura',
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
        desert: [
          { value: 'adult-one', label: 'Sticky toffee pudding', description: 'with ice cream' },
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
        desert: 'adult-one'
      }, {
        name: 'G',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        desert: 'adult-one'
      }, { name: 'Quintana', canCome: 'yes', starter: 'adult-meat', main: 'adult-meat', desert: 'adult-one' }]);
      expect(html).to.contain('Froome, G and Quintana');
    });

    it('should include "We are delighted..." in html if all guests can come', () => {
      const html = guestContent.html(weddingDetails, [{
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        desert: 'adult-one'
      }, { canCome: 'yes', starter: 'adult-meat', main: 'adult-meat', desert: 'adult-one' }]);
      expect(html).to.contain('We are delighted');
    });

    it('should not include "We are delighted..." in html if some guests cannot come', () => {
      const html = guestContent.html(weddingDetails, [{
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        desert: 'adult-one'
      },
        { canCome: 'no' }]);
      expect(html).not.to.contain('We are delighted');
    });

    it('should include "We are sorry..." in html if all guests cannot come', () => {
      const html = guestContent.html(weddingDetails, [{ canCome: 'no' }, { canCome: 'no' }]);
      expect(html).to.contain('We are sorry');
    });

    it('should include food choice in guest response', () => {
      const html = guestContent.html(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        desert: 'adult-one'
      }]);
      expect(html).to.contain('Starter: Pork Pie with a rocket salad');
      expect(html).to.contain('Main: Roast Beef with yorkshire pudding');
      expect(html).to.contain('Desert: Sticky toffee pudding with ice cream');
    });

    it('should stringify the html content for the text response', () => {
      const text = guestContent.text(weddingDetails, [{
        name: 'Froome',
        canCome: 'yes',
        starter: 'adult-meat',
        main: 'adult-meat',
        desert: 'adult-one'
      }]);
      expect(text).to.equal('Dear Froome\n\n\n\nThank you for RSVPing to our wedding.\n\nWe are delighted you can attend.\n\nWe have received your food choices as detailed below:\n\n\n--------------------------------------------------------------------------------\n\nFroome\n\nStarter: Pork Pie with a rocket salad\n\nMain: Roast Beef with yorkshire pudding\n\nDesert: Sticky toffee pudding with ice cream\n\nPlease contact us if you need to amend your choices.\n\nFrom,\n\nJason and Laura');
    });
  });
});
