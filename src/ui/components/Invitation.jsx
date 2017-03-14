const React = require('react');
const { default: ReactHtmlParser } = require('react-html-parser');

const RSVP = require('./RSVP.jsx');

class Invitation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.toggleShowRsvp = this.toggleShowRsvp.bind(this);
    this.submitAndUpdate = this.submitAndUpdate.bind(this);
    this.state = {
      showContent: true,
      moreInfo: false,
      showRsvp: false,
      justSubmitted: false
    };
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

  submitAndUpdate(values) {
    this.props.rsvpSubmit(values).then(() => {
      this.setState({
        justSubmitted: true
      });
    });
  }

  render() {
    const { wedding, menuOptions, hasRsvped } = this.props;
    const { showContent, moreInfo, showRsvp, justSubmitted } = this.state;
    const moreInfoButtonText = moreInfo ? 'Hide info' : 'More info';
    const rsvpButtonText = showRsvp ? 'Hide RSVP' : 'RSVP';
    let rsvp;
    if (hasRsvped) {
      rsvp = <p>We have already received your RSVP response.</p>;
    } else if (justSubmitted) {
      rsvp = <p>Thank you for your response. If you have any questions <a href={`mailto:${wedding.email}`}>please contact us</a>.</p>;
    } else {
      rsvp = <RSVP onSubmit={this.submitAndUpdate} menuOptions={menuOptions} />;
    }
    return (
      <div>
        <div className="nav">
          <img className="logo img-responsive pull-left" src="/images/db/logo.png" alt="logo" />
          <button className="btn btn-secondary btn-lg btn-custom pull-right" onClick={this.toggleMoreInfo}>{moreInfoButtonText}</button>
          <button className="btn btn-primary btn-lg btn-custom pull-right" onClick={this.toggleShowRsvp}>{rsvpButtonText}</button>
        </div>
        <div className="text-center">
          {showContent ?
            <div>
              <p>You are invited to the wedding of</p>
              <span className="lead">{wedding.brideAndGroom}</span>
              <p>{wedding.date}</p>
              <p>{wedding.time}</p>
              <address>{wedding.location}</address>
            </div> : false}
          {moreInfo ? ReactHtmlParser(wedding.moreInfo) : false}
          {showRsvp ? rsvp : false}
        </div>
      </div>
    );
  }
}

Invitation.propTypes = {
  wedding: React.PropTypes.shape({
    brideAndGroom: React.PropTypes.string,
    date: React.PropTypes.string,
    time: React.PropTypes.string,
    location: React.PropTypes.string,
    moreInfo: React.PropTypes.string
  }),
  rsvpSubmit: React.PropTypes.func,
  menuOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  hasRsvped: React.PropTypes.bool
};

module.exports = Invitation;
