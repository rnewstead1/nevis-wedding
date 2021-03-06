import { SubmissionError } from 'redux-form';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const millisInTwentyFourHours = (24 * 60 * 60 * 1000);

const login = (credentials) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${credentials.name}&phrase=${credentials.phrase}`
  };

  return fetch('api/session/create', config)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject('failed login');
      }
      return response.json();
    }).then(({ user }) => {
      const twentyFourHoursFromNow = new Date(new Date().getTime() + millisInTwentyFourHours).toUTCString();
      global.document.cookie = `id_token=${user.id_token};expires=${twentyFourHoursFromNow}`;
      return user.names;
    });
};

const saveForm = values =>
  new Promise((resolve, reject) =>
    fetch('/api/rsvp', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(values)
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((json) => {
          throw new SubmissionError(json);
        });
      }
      console.log(`Submitted:\n\n${JSON.stringify(values)}`);
      resolve();
    }).catch((err) => {
      console.log('Error: ', err);
      reject(err);
    })
  );

const getInvitation = () =>
  fetch('/api/invitation', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return response.json();
  }).catch(err => console.log('Error: ', err));

module.exports = { login, saveForm, getInvitation };
