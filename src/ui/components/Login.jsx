const React = require('react');
const Modal = require('react-modal');

const { login } = require('../api-client');
const { isAuthenticated } = require('../is-authenticated');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePhraseChange = this.handlePhraseChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      phrase: '',
      open: this.props.open
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  onSubmit() {
    login({ phrase: this.state.phrase })
      .then((names) => {
        this.setState({
          open: !(isAuthenticated())
        });
        if (this.props.onLogin) this.props.onLogin(null, names);
      })
      .catch((err) => {
        if (this.props.onLogin) this.props.onLogin(err);
        else console.log('Error logging in');
      });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.nativeEvent.preventDefault();
      this.onSubmit();
    }
  }

  handlePhraseChange(e) {
    this.setState({ phrase: e.target.value });
  }

  render() {
    const style = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <Modal isOpen={this.state.open} onAfterOpen={() => { }} onRequestClose={() => { }} closeTimeoutMS={5} style={style} contentLabel="Modal">
        <form className="form">
          <div className="form-group">
            <label className="control-label" htmlFor="phrase">Please enter the code from your invitation</label>
            <div>
              <input type="text" name="phrase" className="form-control input-lg" value={this.state.phrase} onChange={this.handlePhraseChange} onKeyPress={this.onKeyPress} />
            </div>
          </div>
          <div className="formGroup">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.onSubmit}>Enter</button>
          </div>
        </form>
      </Modal>
    );
  }
}

Login.propTypes = {
  open: React.PropTypes.bool,
  onLogin: React.PropTypes.func
};

module.exports = Login;
