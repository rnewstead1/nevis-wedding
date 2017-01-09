const { expect } = require('chai');
const contentBuilderCtr = require('../../../src/app/email/content-builder');

describe('content-builder', () => {
  const contentBuilder = contentBuilderCtr();

  describe('email to guests', () => {
    const { guestContent } = contentBuilder;

    it('should include "We are delighted..." in html if all guests can come', () => {
      const html = guestContent.html({}, [{ canCome: 'yes' }, { canCome: 'yes' }]);
      expect(html).to.contain('We are delighted');
    });

    it('should not include "We are delighted..." in html if some guests cannot come', () => {
      const html = guestContent.html({}, [{ canCome: 'yes' }, { canCome: 'no' }]);
      expect(html).not.to.contain('We are delighted');
    });

    it('should include "We are sorry..." in html if all guests cannot come', () => {
      const html = guestContent.html({}, [{ canCome: 'no' }, { canCome: 'no' }]);
      expect(html).to.contain('We are sorry');
    });
  });
});
