const React = require('react');
const { Field } = require('redux-form');

const Menu = ({ options, guest }) =>
  (
    <div className="form-group">
      <label className="col-sm-3 control-label" htmlFor="foodChoice">What would you like to eat?</label>

      <div className="col-sm-3">
        <Field name={`${guest}.foodChoice`} component="select" className="col-sm-9">
          <option disabled hidden />
          {
            options.map((option, i) =>
              <option key={`${guest}.foodChoice-${i}`} value={`${option.value}`}>{`${option.label}`}</option>
            )
          }
        </Field>
      </div>

    </div>
  );

Menu.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    })
  ).isRequired,
  guest: React.PropTypes.string.isRequired
};

module.exports = Menu;
