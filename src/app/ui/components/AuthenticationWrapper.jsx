const React = require('react');

const Login = require('./Login.jsx');

class AuthenticationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    };
  }

  onLogin() {
    this.setState({
      isAuthenticated: true
    });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Login open onLogin={this.onLogin} />
        </div>
      );
    }
    return this.props.content;
  }
}

AuthenticationWrapper.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  content: React.PropTypes.element
};

module.exports = AuthenticationWrapper;
