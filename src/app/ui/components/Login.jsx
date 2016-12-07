const React = require('react');
const Modal = require('react-modal');

const { login } = require('../api-client');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhraseChange = this.handlePhraseChange.bind(this);
    this.state = {
      name: '',
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
    login({ name: this.state.name, phrase: this.state.phrase })
      .then(() => {
        this.setState({
          open: Boolean(global.document.cookie.indexOf('id_token'))
        });
        if (this.props.onLogin) this.props.onLogin();
      })
      .catch((err) => {
        if (this.props.onLogin) this.props.onLogin(err);
        else console.log('Error logging in');
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
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
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="name">Name</label>
            <div className="col-sm-9">
              <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="phrase">Phrase</label>
            <div className="col-sm-9">
              <input type="text" name="phrase" value={this.state.phrase} onChange={this.handlePhraseChange} />
            </div>
          </div>
          <div className="formGroup">
            <button type="button" onClick={this.onSubmit}>Enter</button>
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
