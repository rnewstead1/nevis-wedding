/* eslint no-underscore-dangle: "off" */

const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const rsvpController = require('../../../src/app/controllers/rsvp');

describe('rsvp', () => {
  const { save } = rsvpController(() => console.log('DB'),
    () => console.log('emailer!'));


  describe('submit bad rsvp', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/rsvp',
      body: {
        guests: [
          { name: '', canCome: false }
        ]
      }
    });
    const response = httpMocks.createResponse();
    save(request, response);

    it('should return a 400 with invalid request', () => {
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('submit no guests', () => {
    const response = httpMocks.createResponse();
    save(httpMocks.createRequest({
      body: {
        guests: []
      }
    }),
    response);

    it('should return an error saying that there are no guests', () => {
      expect(response.statusCode).to.equal(400);
      expect(response._getData()).to.contain('at least one guest');
    });
  });

  describe('all guests should have names and responses', () => {
    const response = httpMocks.createResponse();
    save(httpMocks.createRequest({
      body: {
        guests: [{ name: 'guest1' },
                 { canCome: false },
                 { }]
      }
    }),
    response);
    const data = JSON.parse(response._getData());

    it('should return an error for guest missing a name', () => {
      expect(data.guests[1].name).to.contain('Please enter a name');
    });

    it('should return an error for guest missing an RSVP', () => {
      expect(data.guests[0].canCome).to.contain('Please enter a response');
    });

    it('should return two errors for missing name and RSVP', () => {
      expect(data.guests[2].name).to.contain('Please enter a name');
      expect(data.guests[2].canCome).to.contain('Please enter a response');
    });
  });
});
