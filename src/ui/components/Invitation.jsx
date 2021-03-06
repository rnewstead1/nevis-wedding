const React = require('react');
const { Provider } = require('react-redux');
const { default: ReactHtmlParser } = require('react-html-parser');

const { saveForm, getInvitation } = require('../api-client');
const { isAuthenticated } = require('../is-authenticated');
const RSVP = require('./RSVP.jsx');
const Login = require('./Login.jsx');

class Invitation extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.getInvitationDetails = this.getInvitationDetails.bind(this);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.toggleShowRsvp = this.toggleShowRsvp.bind(this);
    this.submitAndUpdate = this.submitAndUpdate.bind(this);
    this.state = {
      authenticated: isAuthenticated(),
      content: null,
      guests: null,
      showContent: true,
      moreInfo: false,
      showRsvp: false,
      justSubmitted: false,
      wedding: {},
      rsvped: false
    };
  }

  componentDidMount() {
    if (this.state.authenticated) {
      this.getInvitationDetails();
    }
  }

  onLogin(error, guests) {
    if (!error) {
      this.setState({
        authenticated: true,
        guests
      });
      this.getInvitationDetails();
    }
  }

  getInvitationDetails() {
    getInvitation()
      .then((response) => {
        this.setState({
          wedding: response.wedding,
          rsvped: response.rsvped,
        });
      }).catch(err => console.log('err: ', err));
  }

  submitAndUpdate(values) {
    return new Promise((resolve, reject) => {
      saveForm(values).then(() => {
        this.setState({
          justSubmitted: true
        });
        resolve();
      })
      .catch(err => reject(err));
    });
  }

  toggleShowRsvp() {
    const current = this.state.showRsvp;
    const newState = !current;
    if (newState) {
      this.setState({
        showRsvp: true,
        showContent: false,
        moreInfo: false
      });
    } else {
      this.setState({
        showRsvp: false,
        showContent: true
      });
    }
  }

  toggleMoreInfo() {
    const current = this.state.moreInfo;
    const newState = !current;
    if (newState) {
      this.setState({
        moreInfo: newState,
        showRsvp: false
      });
    } else {
      this.setState({
        moreInfo: newState
      });
    }
  }

  render() {
    const { authenticated, showContent, moreInfo, showRsvp, justSubmitted, guests, wedding, rsvped } = this.state;
    const { store } = this.props;
    const moreInfoButtonText = moreInfo ? 'Hide details' : 'Details';
    const rsvpButtonText = showRsvp ? 'Hide RSVP' : 'RSVP';
    let rsvp;
    if (rsvped) {
      rsvp = <p>We have already received your RSVP response.</p>;
    } else if (justSubmitted) {
      rsvp = <p>Thank you for your response. If you have any questions <a href={`mailto:${wedding.email}`}>please contact us</a>.</p>;
    } else {
      rsvp = <RSVP onSubmit={this.submitAndUpdate} menuOptions={wedding.menu} />;
    }
    if (!authenticated) {
      return (
        <div>
          <Login open onLogin={this.onLogin} />
        </div>
      );
    }
    return (<div>
      <Provider store={store}>
        <div className="logged-in">
          <div className="nav">
            <img className="logo img-responsive pull-left" src="/images/db/logo.png" alt="logo" />
            <button className="btn btn-secondary btn-lg btn-custom pull-right" onClick={this.toggleMoreInfo}>{moreInfoButtonText}</button>
            <button className="btn btn-primary btn-lg btn-custom pull-right" onClick={this.toggleShowRsvp}><i className="glyphicon glyphicon-envelope" aria-hidden="true" />{rsvpButtonText}</button>
          </div>
          <div className="text-center">
            {guests ? <p className="lead">Welcome {guests}</p> : false}
            {showContent ?
              <div>
                <p>You are invited to the wedding of</p>
                <h1>{wedding.brideAndGroom}</h1>
                <p>{wedding.date}</p>
                <p>{wedding.time}</p>
                <address>{wedding.location}</address>
                <p>{wedding.rsvp}</p>
              </div> : false}
            {moreInfo ? ReactHtmlParser(wedding.moreInfo) : false}
            {moreInfo ?
              <div className="google-maps">
                <iframe src={ReactHtmlParser(wedding.mapUrl)} width="600" height="450" frameBorder="0" style={{ border: '0' }} allowFullScreen />
              </div> : false}
            {moreInfo ? <p><b><a href={`mailto:${wedding.email}`}>Contact us</a></b></p> : false}
            {showRsvp ? rsvp : false}
          </div>
        </div>
      </Provider>
    </div>);
  }
}

Invitation.propTypes = {
  store: React.PropTypes.object, // eslint-disable-line
};

module.exports = Invitation;
