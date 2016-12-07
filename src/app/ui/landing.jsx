require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <div>
    <p>Welcome to Nevis wedding</p>
    <a href="/rsvp">Please RSVP</a>
  </div>,
  document.getElementById('content')
);

