const React = require('react');
const ReactDOM = require('react-dom');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');

const isAuthenticated = Boolean(!global.document.cookie.indexOf('id_token'));
const content = (
  <div>
    <h1>Nevis Wedding</h1>
    <p>Welcome to Nevis wedding</p>
    <a href="/rsvp">Please RSVP</a>
  </div>
);

ReactDOM.render(
  <AuthenticationWrapper isAuthenticated={isAuthenticated} content={content} />,
  document.getElementById('content')
);
