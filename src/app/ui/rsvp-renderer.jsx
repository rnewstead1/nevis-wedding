const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const RSVP = require('./RSVP.jsx').default;

const reducer = combineReducers({
  form: reduxFormReducer
});
const store = createStore(reducer);

const showResults = (values) => {
  console.log(`Submitted:\n\n${JSON.stringify(values)}`);
};

ReactDOM.render(
  <Provider store={store}>
    <RSVP onSubmit={showResults} />
  </Provider>,
  document.getElementById('content')
);
