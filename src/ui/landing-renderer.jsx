const React = require('react');
const ReactDOM = require('react-dom');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');

const content = (
  <div>
    <h2>Nevis Wedding</h2>
    <p>Welcome to Nevis wedding</p>
    <a href="/rsvp">Please RSVP</a>
  </div>
);

ReactDOM.render(
  <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content} />,
  document.getElementById('content')
);
