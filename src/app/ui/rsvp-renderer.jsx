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

const content = (
  <Provider store={store}>
    <RSVP onSubmit={saveForm} menuOptions={menuOptions} />
  </Provider>
);

const isAuthenticated = Boolean(!global.document.cookie.indexOf('id_token'));

ReactDOM.render(
  <AuthenticationWrapper isAuthenticated={isAuthenticated} content={content} />,
  document.getElementById('content')
);
