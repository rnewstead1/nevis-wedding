const React = require('react');
const { default: ReactHtmlParser } = require('react-html-parser');

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      moreInfo: false
    };
  }

  toggleMoreInfo() {
    const current = this.state.moreInfo;
    this.setState({
      moreInfo: !current
    });
  }

  render() {
    const { wedding } = this.props;
    const moreInfoButtonText = this.state.moreInfo ? 'Hide info' : 'More info';
    return (
      <div>
        <div className="text-center">
          <span className="lead">{wedding.brideAndGroom}</span>
          <p>would love you to join us for our wedding</p>
          <p>{wedding.date}</p>
          <p>{wedding.time}</p>
          <address>{wedding.location}</address>
          <a className="btn btn-primary btn-lg btn-custom" href="/rsvp">RSVP</a>
          <button className="btn btn-secondary btn-lg btn-custom" onClick={this.toggleMoreInfo}>{moreInfoButtonText}</button>
          {this.state.moreInfo ? ReactHtmlParser(wedding.moreInfo) : false}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  wedding: React.PropTypes.shape({
    imageUrl: React.PropTypes.string,
    brideAndGroom: React.PropTypes.string,
    date: React.PropTypes.string,
    time: React.PropTypes.string,
    location: React.PropTypes.string,
    moreInfo: React.PropTypes.string
  })
};

module.exports = Landing;
