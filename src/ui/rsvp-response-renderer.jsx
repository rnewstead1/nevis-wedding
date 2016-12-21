const React = require('react');
const ReactDOM = require('react-dom');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');
const apiClient = require('./api-client');

const content = wedding => (
  <div>
    <img src={wedding.imageUrl} className="img-responsive img-rounded" alt="wedding" />
    <div className="text-center">
      <p>Thank you for your response</p>
      <p>If you have any questions please contact us at {wedding.email}</p>
    </div>
  </div>
);

apiClient.getContent('landing')
  .then((wedding) => {
    console.log('Rendering response', wedding);
    let element;
    if (!wedding) {
      element = <div>Oops, something went wrong...</div>;
    } else {
      element = <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content(wedding)} />;
    }
    ReactDOM.render(element, document.getElementById('content'));
  });

ReactDOM.render(
  <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content} />,
  document.getElementById('content')
);
