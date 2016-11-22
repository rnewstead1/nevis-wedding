const React = require('react');
const { Field, reduxForm } = require('redux-form');

const RSVP = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Who are you?</label>
        <div>
          <Field name="name" component="input" type="text" />
        </div>
      </div>
      <div>
        <label htmlFor="canCome">Can you make it?</label>
        <div>
          <label htmlFor="canCome"><Field name="canCome" component="input" type="radio" value="yes" /> Yes</label>
          <label htmlFor="canCome"><Field name="canCome" component="input" type="radio" value="no" /> No</label>
        </div>
      </div>
      <div>
        <label htmlFor="foodChoice">What would you like to eat?</label>
        <div>
          <label htmlFor="foodChoice"><Field name="foodChoice" component="input" type="radio" value="meat" /> Haggis</label>
          <label htmlFor="foodChoice"><Field name="foodChoice" component="input" type="radio" value="vegetarian" /> Veggie haggis</label>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Start over</button>
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
