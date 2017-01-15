const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const { default: ReduxThunk } = require('redux-thunk');
const auth = require('./reducers/authentication');
const { saveForm } = require('./api-client');
const RSVP = require('./components/RSVP.jsx');
const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');
const apiClient = require('./api-client');

const menuOptions = [
  { value: 'meat', label: 'Haggis' },
  { value: 'vegetarian', label: 'Veggie haggis' },
  { value: 'child', label: 'Child option' }
];

const reducer = combineReducers({
  form: reduxFormReducer,
  auth
});
const store = createStore(reducer, applyMiddleware(ReduxThunk, createLogger()));

apiClient.getRsvpStatus().then((response) => {
  console.log('RSVP response status is ', response);

  if (response.rsvped) {
    ReactDOM.render(<h4>Thanks, we have already received your response</h4>, document.getElementById('content'));
  } else {
    const content = (
      <Provider store={store}>
        <RSVP onSubmit={saveForm} menuOptions={menuOptions} />
      </Provider>
      );

    ReactDOM.render(
      <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content} />,
      document.getElementById('content')
    );
  }
}).catch(err => console.log('rsvp-renderer error', err));
