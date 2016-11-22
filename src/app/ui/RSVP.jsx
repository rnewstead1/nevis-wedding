const React = require('react');
const { Field, reduxForm } = require('redux-form');

const RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name" />
        </div>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name" />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email" />
        </div>
      </div>
      <div>
        <label htmlFor="sex">Sex</label>
        <div>
          <label htmlFor="sex"><Field name="sex" component="input" type="radio" value="male" /> Male</label>
          <label htmlFor="sex"><Field name="sex" component="input" type="radio" value="female" /> Female</label>
        </div>
      </div>
      <div>
        <label htmlFor="favoriteColor">Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component="input" type="checkbox" />
        </div>
      </div>
      <div>
        <label htmlFor="notes">Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};

RSVP.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool
};

export default reduxForm({
  form: 'simple'
})(RSVP);
