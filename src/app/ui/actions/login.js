const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const receiveLogin = () =>
  ({
    type: LOGIN_SUCCESS
  });

const loginError = message =>
  ({
    type: LOGIN_FAILURE,
    action: message
  });

const loginUser = err =>
  (dispatch) => {
    if (err) {
      dispatch(loginError('Login error'));
      console.log('Error: ', err);
    }
    dispatch(receiveLogin());
  };

module.exports = {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  loginUser,
};
