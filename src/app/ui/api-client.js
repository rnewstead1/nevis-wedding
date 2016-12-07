require('es6-promise').polyfill();
require('isomorphic-fetch');

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
      const oneHourFromNow = new Date(new Date().getTime() + 600000).toUTCString();
      global.document.cookie = `id_token=${user.id_token};expires=${oneHourFromNow}`;
    });
};

const saveForm = values =>
  fetch('/api/rsvp', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(values)
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    console.log(`Submitted:\n\n${JSON.stringify(values)}`);
  }).catch(err => console.log('Error: ', err));

module.exports = { login, saveForm };
