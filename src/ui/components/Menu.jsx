const React = require('react');
const { Field } = require('redux-form');

const Menu = ({ options, guest, hasDiet }) =>
  (
    <div>
      <div className="form-group">
        <label className="control-label" htmlFor="foodChoice">What would you like to eat?</label>
        {
          options.map(option =>
            <div className="radio">
              <label htmlFor={`${option.value}`}>
                <Field name={`${guest}.foodChoice`} component="input" type="radio" value={`${option.value}`} required />
                {`${option.label}`}
              </label>
            </div>
            )
        }
      </div>

      <div className="form-group">
        <label className="control-label" htmlFor={`${guest}.hasDiet`}>Do you have any dietary requirements?</label>
        <div className="radio">
          <label htmlFor="canCome"><Field name={`${guest}.hasDiet`} component="input" type="radio" value="yes" required /> Yes</label>
        </div>
        <div className="radio">
          <label htmlFor="canCome"><Field name={`${guest}.hasDiet`} component="input" type="radio" value="no" required /> No</label>
        </div>
      </div>

      {hasDiet &&
        <div className="form-group">
          <label className="control-label" htmlFor={`${guest}.dietaryReqs`}>Please specify</label>
          <div>
            <Field name={`${guest}.dietaryReqs`} component="textarea" className="form-control" rows="3">
              <option disabled hidden />
            </Field>
          </div>
        </div>}
    </div>
  );

Menu.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    })
  ).isRequired,
  guest: React.PropTypes.string.isRequired,
  hasDiet: React.PropTypes.bool.isRequired
};

module.exports = Menu;
