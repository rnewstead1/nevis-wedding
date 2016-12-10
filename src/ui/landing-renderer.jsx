const React = require('react');
const ReactDOM = require('react-dom');

const AuthenticationWrapper = require('./components/AuthenticationWrapper.jsx');
const { isAuthenticated } = require('./is-authenticated');
const apiClient = require('./api-client');

const content = wedding => (
  <div>
    <img src={wedding.imageUrl} className="img-responsive img-rounded" alt="wedding" />
    <div className="text-center">
      <span className="lead">{wedding.brideAndGroom}</span>
      <p>would love you to join us for our wedding</p>
      <p>{wedding.date}</p>
      <p>{wedding.time}</p>
      <address>{wedding.location}</address>
      <a href="/rsvp">Please RSVP</a>
    </div>
  </div>
);

apiClient.getContent('landing')
  .then((wedding) => {
    ReactDOM.render(
      <AuthenticationWrapper isAuthenticated={isAuthenticated()} content={content(wedding)} />,
      document.getElementById('content')
    );
  });
