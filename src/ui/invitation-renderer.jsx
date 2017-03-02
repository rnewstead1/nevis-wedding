const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const { default: ReduxThunk } = require('redux-thunk');

const auth = require('./reducers/authentication');
const { saveForm, getContent, getRsvpStatus } = require('./api-client');
const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');
const Invitation = require('./components/Invitation.jsx');

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

// TODO single api call here
Promise.all([getContent('invitation'), getRsvpStatus()])
  .then(([wedding, rsvpResponse]) => {
    let element;
    if (!wedding) {
      element = <div>Oops, something went wrong...</div>;
    } else {
      const content = (
        <Provider store={store}>
          <Invitation rsvpSubmit={saveForm} menuOptions={menuOptions} wedding={wedding} hasRsvped={rsvpResponse.rsvped} />
        </Provider>
      );
      element = <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content} />;
    }
    ReactDOM.render(element, document.getElementById('content'));
  }).catch(err => console.log('err: ', err));
