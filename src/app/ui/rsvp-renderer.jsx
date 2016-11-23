require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const RSVP = require('./RSVP.jsx').default;

const reducer = combineReducers({
  form: reduxFormReducer
});
const store = createStore(reducer, applyMiddleware(createLogger()));

const saveForm = (values) => {
  console.log(`Submitted:\n\n${JSON.stringify(values)}`);

  fetch('/api/rsvp', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
};

ReactDOM.render(
  <Provider store={store}>
    <RSVP onSubmit={saveForm} />
  </Provider>,
  document.getElementById('content')
);
