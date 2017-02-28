const React = require('react');
const ReactDOM = require('react-dom');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const Landing = require('./components/Landing.jsx');
const { isAuthenticated } = require('./is-authenticated');
const apiClient = require('./api-client');

apiClient.getContent('landing')
  .then((wedding) => {
    let element;
    if (!wedding) {
      element = <div>Oops, something went wrong...</div>;
    } else {
      const content = <Landing wedding={wedding} />;
      element = <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content} />;
    }
    ReactDOM.render(element, document.getElementById('content'));
  });
