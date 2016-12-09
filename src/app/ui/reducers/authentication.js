const login = require('../actions/login');
const { isAuthenticated } = require('../is-authenticated');

// we should also check if the token is expired. And valid?
module.exports = (state = { isAuthenticated: isAuthenticated() }, action) => {
  switch (action.type) {
    case login.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      });
    case login.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    default:
      return Object.assign({}, state, {
        isAuthenticated: isAuthenticated()
      });
  }
};
