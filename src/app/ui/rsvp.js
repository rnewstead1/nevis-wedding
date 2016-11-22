const React = require('react');
const ReactDOM = require( 'react-dom');
const { Provider } = require( 'react-redux');
const { createStore, combineReducers } = require( 'redux');
const { reducer: reduxFormReducer } = require( 'redux-form');
const RSVP = require( './RSVP.jsx').default;

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = createStore(reducer);

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve()
    }, 500)
  });

ReactDOM.render(
  <Provider store={store}>
    <RSVP onSubmit={showResults}/>
  </Provider>,
  document.getElementById('content')
);
