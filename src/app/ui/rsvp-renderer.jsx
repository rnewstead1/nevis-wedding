require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const { default: ReduxThunk } = require('redux-thunk');
const auth = require('./reducers/authentication');
const RSVP = require('./components/RSVP.jsx');

const reducer = combineReducers({
  form: reduxFormReducer,
  auth
});
const store = createStore(reducer, applyMiddleware(ReduxThunk, createLogger()));

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

ReactDOM.render(
  <Provider store={store}>
    <RSVP onSubmit={saveForm} />
  </Provider>,
  document.getElementById('content')
);
