require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react');
const ReactDOM = require('react-dom');

const Login = require('./components/Login.jsx');

ReactDOM.render(
  <div>
    <p>Welcome to Nevis wedding</p>
    <a href="/rsvp">Please RSVP</a>
    <Login open={Boolean(global.document.cookie.indexOf('id_token'))} />
  </div>,
  document.getElementById('content')
);

