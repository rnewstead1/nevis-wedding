const { login } = require('../api-client');

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = () =>
  ({
    type: LOGIN_REQUEST,
    isAuthenticated: false
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

const loginUser = credentials =>
  (dispatch) => {
    dispatch(requestLogin(credentials));

    return login(credentials)
      .then(() => dispatch(receiveLogin()))
      .catch((err) => {
        dispatch(loginError('Login error'));
        console.log('Error: ', err);
      });
  };

module.exports = {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  loginUser,
};
