const React = require('react');
const { Field } = require('redux-form');

const Menu = ({ options, guest, hasDiet }) =>
  (
    <div>
      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor="foodChoice">What would you like to eat?</label>

        <div className="col-sm-9">
          <Field name={`${guest}.foodChoice`} component="select" className="col-sm-12">
            <option disabled hidden />
            {
              options.map((option, i) =>
                <option key={`${guest}.foodChoice-${i}`} value={`${option.value}`}>{`${option.label}`}</option>
              )
            }
          </Field>
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-3 control-label" htmlFor={`${guest}.canCome`}>Do you have any dietary requirements?</label>
        <div className="radio radio-inline">
          <label htmlFor="canCome"><Field name={`${guest}.hasDiet`} component="input" type="radio" value="yes" /> Yes</label>
        </div>
        <div className="radio radio-inline">
          <label htmlFor="canCome"><Field name={`${guest}.hasDiet`} component="input" type="radio" value="no" /> No</label>
        </div>
      </div>

      {hasDiet &&
        <div className="form-group">
          <label className="col-sm-3 control-label" htmlFor="foodChoice">Please specify</label>
          <div className="col-sm-9">
            <Field name={`${guest}.dietaryReqs`} component="textarea" className="col-sm-12">
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
