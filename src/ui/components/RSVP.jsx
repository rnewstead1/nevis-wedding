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
  const hasDiet = guests ? guests.map(guest => guest.hasDiet === 'yes') : [];

  return {
    auth: state.auth,
    canCome,
    hasDiet
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
    <div className="col-sm-9">
      <input {...input} type={type} placeholder={label} name={label} className="col-sm-12" />
      {touched && error && <span className="text-danger"> {error}</span>}
    </div>
  </div>
);

const renderGuests = ({ fields, menuOptions, canCome, hasDiet, meta: { touched, error } }) => (
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
        {canCome[index] && <Menu options={menuOptions} guest={guest} hasDiet={hasDiet[index]} />}
      </li>
    )}
  </ul>
);

let RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting, auth, loginUser, menuOptions, canCome, hasDiet, error } = props;
  return (
    <div>
      <h2>RSVP</h2>
      {error && <p className="bg-danger text-center">{error}</p>}
      <Login open={!auth.isAuthenticated} onLogin={loginUser} />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <FieldArray name="guests" component={renderGuests} menuOptions={menuOptions} canCome={canCome} hasDiet={hasDiet} />
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

const validate = (values) => {
  const errors = {};

  if (values.guests) {
    errors.guests = [];
    for (let ii = 0; ii < values.guests.length; ii++) {
      errors.guests[ii] = {};
      if (!values.guests[ii].name) {
        errors.guests[ii].name = 'Please enter your name';
      } else if (values.guests[ii].name.length < 5) {
        errors.guests[ii].name = 'Please enter your full name';
      }
    }
  }

  return errors;
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
  hasDiet: React.PropTypes.arrayOf(React.PropTypes.bool),
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
  canCome: React.PropTypes.arrayOf(React.PropTypes.bool),
  hasDiet: React.PropTypes.arrayOf(React.PropTypes.bool),
  error: React.PropTypes.string
};

RSVP = reduxForm({ form: 'rsvpForm', validate })(RSVP);
RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVP);

module.exports = RSVP;
