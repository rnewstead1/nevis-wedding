const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const { default: ReduxThunk } = require('redux-thunk');

const auth = require('./reducers/authentication');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');

const reducer = combineReducers({
  form: reduxFormReducer,
  auth
});
const store = createStore(reducer, applyMiddleware(ReduxThunk, createLogger()));

ReactDOM.render(<AuthenticationWrapper store={store} isAuthenticated={isAuthenticated()} />, document.getElementById('content'));
