const React = require('react');
const { Provider } = require('react-redux');

const { saveForm, getInvitation } = require('../api-client');
const Invitation = require('./Invitation.jsx');
const Login = require('./Login.jsx');

const menuOptions = [
  { value: 'meat', label: 'Haggis' },
  { value: 'vegetarian', label: 'Veggie haggis' },
  { value: 'child', label: 'Child option' }
];

class AuthenticationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.getInvitationDetails = this.getInvitationDetails.bind(this);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      content: null,
      guests: null
    };
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.getInvitationDetails();
    }
  }

  onLogin(error, guests) {
    if (!error) {
      this.setState({
        isAuthenticated: true,
        guests
      });
      this.getInvitationDetails();
    }
  }

  getInvitationDetails() {
    getInvitation()
      .then((response) => {
        this.setState({
          content: <Provider store={this.props.store}><Invitation guests={this.state.guests} rsvpSubmit={saveForm} menuOptions={menuOptions} wedding={response.wedding} hasRsvped={response.rsvped} /></Provider>,
        });
      }).catch(err => console.log('err: ', err));
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div>
          <Login open onLogin={this.onLogin} />
        </div>
      );
    }
    return (<div>
      {this.state.content}
    </div>);
  }
}

AuthenticationWrapper.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  store: React.PropTypes.object // eslint-disable-line
};

module.exports = AuthenticationWrapper;
