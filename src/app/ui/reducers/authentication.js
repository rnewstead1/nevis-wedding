const login = require('../actions/login');

// we should also check if the token is expired. And valid?
module.exports = (state = { isAuthenticated: Boolean(!global.document.cookie.indexOf('id_token')) }, action) => {
  switch (action.type) {
    case login.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: action.credentials
      });
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
        isAuthenticated: Boolean(!global.document.cookie.indexOf('id_token'))
      });
  }
};
