const React = require('react');
const { Field } = require('redux-form');

const Menu = ({ options }) =>
  (
    <div className="form-group">
      <label className="col-sm-2 control-label" htmlFor="foodChoice">What would you like to eat?</label>
      {
        options.map((option, i) =>
          <div className="radio col-sm-10" key={`foodChoice-${i}`}>
            <label htmlFor="foodChoice"><Field name="foodChoice" component="input" type="radio" value={option.value} />{option.label}</label>
          </div>
        )
      }
    </div>
  );

Menu.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    })
  ).isRequired
};

module.exports = Menu;
