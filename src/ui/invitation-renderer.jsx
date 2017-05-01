const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { reducer: reduxFormReducer } = require('redux-form');
const createLogger = require('redux-logger');
const { default: ReduxThunk } = require('redux-thunk');

const middleware = [];
middleware.push(ReduxThunk);
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger);
}

const auth = require('./reducers/authentication');

const Invitation = require('./components/Invitation.jsx');

const reducer = combineReducers({
  form: reduxFormReducer,
  auth
});
const store = createStore(reducer, applyMiddleware(ReduxThunk, createLogger()));

ReactDOM.render(<Invitation store={store} />, document.getElementById('content'));
