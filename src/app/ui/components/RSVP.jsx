const React = require('react');
const { Field, reduxForm } = require('redux-form');
const { connect } = require('react-redux');
const { loginUser: login } = require('../actions/login');

const Login = require('./Login.jsx');

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  loginUser(err) {
    return dispatch(login(err));
  },
});

let RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting, auth, loginUser } = props;
  return (
    <div>
      <Login open={!auth.isAuthenticated} onLogin={loginUser} />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">Who are you?</label>
          <div className="col-sm-10">
            <Field name="name" component="input" type="text" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="canCome">Can you make it?</label>
          <div className="radio col-sm-10">
            <label htmlFor="canCome"><Field name="canCome" component="input" type="radio" value="yes" /> Yes</label>
          </div>
          <div className="radio col-sm-10">
            <label htmlFor="canCome"><Field name="canCome" component="input" type="radio" value="no" /> No</label>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="foodChoice">What would you like to eat?</label>
          <div className="radio col-sm-10">
            <label htmlFor="foodChoice"><Field name="foodChoice" component="input" type="radio" value="meat" /> Haggis</label>
          </div>
          <div className="radio col-sm-10">
            <label htmlFor="foodChoice"><Field name="foodChoice" component="input" type="radio" value="vegetarian" /> Veggie haggis</label>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
            <button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Start over</button>
          </div>
        </div>
      </form>
    </div>
  );
};

RSVP.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  auth: React.PropTypes.shape({
    isAuthenticated: React.PropTypes.bool
  }),
  loginUser: React.PropTypes.func,
};

RSVP = reduxForm({ form: 'simple' })(RSVP);
RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVP);

module.exports = RSVP;
