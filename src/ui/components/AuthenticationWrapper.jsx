const React = require('react');

const Login = require('./Login.jsx');

class AuthenticationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      guests: ''
    };
  }

  onLogin(error, names) {
    if (!error) {
      this.setState({
        isAuthenticated: true,
        guests: names
      });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Login open onLogin={this.onLogin} />
        </div>
      );
    }
    return (
      <div>
        {this.state.guests ? <h1>Welcome {this.state.guests}</h1> : false}
        {this.props.content}
      </div>
    );
  }
}

AuthenticationWrapper.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  content: React.PropTypes.element
};

module.exports = AuthenticationWrapper;
