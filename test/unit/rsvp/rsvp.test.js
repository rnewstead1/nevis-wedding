const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const rsvpController = require('../../../src/app/controllers/rsvp');

describe('rsvp', () => {
  const { save } = rsvpController(() => console.log('DB'),
    () => console.log('emailer!'));

  const request = httpMocks.createRequest({
    method: 'GET',
    url: '/api/rsvp',
    body: {
      guests: [
        { name: 'test', canCome: false }
      ]
    }
  });

  const response = httpMocks.createResponse();

  describe('submit bad rsvp', () => {
    save(request, response);

    it('should return a 400 with invalid request', () => {
      expect(response.statusCode).to.equal(400);
    });
  });
});
