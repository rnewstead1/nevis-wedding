require('es6-promise').polyfill();
require('isomorphic-fetch');

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = credentials =>
  ({
    type: LOGIN_REQUEST,
    isAuthenticated: false,
    credentials
  });

const receiveLogin = () =>
  ({
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  });

const loginError = message =>
  ({
    type: LOGIN_FAILURE,
    isAuthenticated: false,
    action: message
  });

const loginUser = (credentials) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${credentials.name}&phrase=${credentials.phrase}`
  };

  return (dispatch) => {
    dispatch(requestLogin(credentials));

    return fetch('api/session/create', config)
      .then((response) => {
        if (!response.ok) {
          dispatch(loginError('Login error'));
          return Promise.reject('failed login');
        }
        return response.json();
      }).then(({ user }) => {
        const oneHourFromNow = new Date(new Date().getTime() + 600000).toUTCString();
        global.document.cookie = `id_token=${user.id_token};;expires=${oneHourFromNow}`;
        dispatch(receiveLogin());
      }).catch(err => console.log('Error: ', err));
  };
};

module.exports = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  loginUser,
};
