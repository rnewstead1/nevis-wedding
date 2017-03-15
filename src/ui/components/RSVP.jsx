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
    <input {...input} type={type} placeholder={label} name={label} className="form-control input-lg" />
    {touched && error && <span className="text-danger"> {error}</span>}
  </div>
);

const renderGuests = ({ fields, menuOptions, canCome, hasDiet, meta: { touched, error } }) => (
  <ul className="list-group">
    {touched && error && <span>{error}</span>}

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
        <Field name={`${guest}.name`} component={renderField} type="text" label="Name" />
        <div className="form-group">
          <div className="radio">
            <label htmlFor={`${guest}.canCome`}><Field name={`${guest}.canCome`} component="input" type="radio" value="yes" /> Yes, I can come</label>
          </div>
          <div className="radio">
            <label htmlFor={`${guest}.canCome`}><Field name={`${guest}.canCome`} component="input" type="radio" value="no" /> No, I can&apos;t come</label>
          </div>
        </div>
        {canCome[index] && <Menu options={menuOptions} guest={guest} hasDiet={hasDiet[index]} />}
      </li>
    )}

    <li className="list-group-item">
      <button type="button" className="btn btn-default" onClick={() => fields.push({})}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        Add guest</button>
    </li>
  </ul>
);

let RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting, auth, loginUser, menuOptions, canCome, hasDiet, error } = props;
  return (
    <div>
      {error && <p className="bg-danger text-center">{error}</p>}
      <Login open={!auth.isAuthenticated} onLogin={loginUser} />
      <form onSubmit={handleSubmit}>
        <FieldArray name="guests" component={renderGuests} menuOptions={menuOptions} canCome={canCome} hasDiet={hasDiet} />
        <Field name="email" component={renderField} type="email" label="Contact email" />
        <div className="form-group btn-toolbar">
          <button className="btn btn-primary btn-custom" type="submit" disabled={pristine || submitting}>{submitting ? 'Submitting' : 'Submit'}</button>
          <button className="btn btn-default btn-custom" type="button" disabled={pristine || submitting} onClick={reset}>Start again</button>
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
