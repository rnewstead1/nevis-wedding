const React = require('react');
const Modal = require('react-modal');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      open: this.props.open,
    };
  }

  close() {
    this.setState({
      open: false
    });
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
      <Modal isOpen={this.state.open} onAfterOpen={() => { }} onRequestClose={this.close} closeTimeoutMS={5} style={style} contentLabel="Modal">
        <p>I am a modal</p>
        <button type="button" className="close" aria-label="Close" onClick={this.close}><span aria-hidden="true">&times;</span></button>
      </Modal>
    );
  }

}

Login.propTypes = {
  open: React.PropTypes.bool.isRequired,
};

module.exports = Login;
