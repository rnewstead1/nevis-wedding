const React = require('react');
const { Field, FieldArray, reduxForm, formValueSelector } = require('redux-form');
const { connect } = require('react-redux');
const { loginUser: login } = require('../actions/login');

const Login = require('./Login.jsx');
const Menu = require('./Menu.jsx');

const selector = formValueSelector('rsvpForm');

const mapStateToProps = (state) => {
  const guests = selector(state, 'guests');
  const canCome = guests ? guests.map(guest => guest.canCome === 'yes') : [];

  return {
    auth: state.auth,
    canCome
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser(err, names) {
    return dispatch(login(err, names));
  },
});

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="col-sm-3 control-label" htmlFor={label}>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} name={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderGuests = ({ fields, menuOptions, canCome, meta: { touched, error } }) => (
  <ul className="list-group">
    <li className="list-group-item">
      <button type="button" className="btn btn-lg btn-block" onClick={() => fields.push({})}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        Add guest</button>
      {touched && error && <span>{error}</span>}
    </li>

    {fields.map((guest, index) =>
      <li key={index} className="list-group-item">
        <button
          type="button"
          className="btn btn-danger btn-sm pull-right"
          title="Remove guest"
          onClick={() => fields.remove(index)}
        >
          <span className="glyphicon glyphicon-trash" aria-hidden="true" />
        </button>
        <h4>Guest #{index + 1}</h4>
        <Field name={`${guest}.name`} component={renderField} type="text" label="Name" />
        <div className="form-group">
          <label className="col-sm-3 control-label" htmlFor={`${guest}.canCome`}>Can you make it?</label>
          <div className="radio radio-inline">
            <label htmlFor="canCome"><Field name={`${guest}.canCome`} component="input" type="radio" value="yes" /> Yes</label>
          </div>
          <div className="radio radio-inline">
            <label htmlFor="canCome"><Field name={`${guest}.canCome`} component="input" type="radio" value="no" /> No</label>
          </div>
        </div>
        {canCome[index] && <Menu options={menuOptions} guest={guest} />}
      </li>
    )}
  </ul>
);

let RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting, auth, loginUser, menuOptions, canCome } = props;
  return (
    <div>
      <h2>RSVP</h2>
      <Login open={!auth.isAuthenticated} onLogin={loginUser} />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <FieldArray name="guests" component={renderGuests} menuOptions={menuOptions} canCome={canCome} />
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
            <button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Start again</button>
          </div>
        </div>
      </form>
    </div>
  );
};

renderField.propTypes = {
  input: React.PropTypes.shape({
    name: React.PropTypes.string
  }),
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.string
  })
};

renderGuests.propTypes = {
  fields: React.PropTypes.shape({
    guest: React.PropTypes.string,
    index: React.PropTypes.number
  }),
  menuOptions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired
      })
    ).isRequired,
  canCome: React.PropTypes.arrayOf(React.PropTypes.bool),
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.string
  })
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
  menuOptions: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    })
  ).isRequired,
  canCome: React.PropTypes.arrayOf(React.PropTypes.bool)
};

RSVP = reduxForm({ form: 'rsvpForm' })(RSVP);
RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVP);

module.exports = RSVP;
