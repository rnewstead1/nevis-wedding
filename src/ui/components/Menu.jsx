const React = require('react');
const { Field } = require('redux-form');

const renderOptions = (options, guest, course, title) => {
  const fieldname = `${guest}.${course}`;
  return (<div className="form-group">
    <label className="control-label menu-label" htmlFor={course}>{title || course.charAt(0).toUpperCase() + course.slice(1)}</label>
    {options.length === 1
      ? <div>
        <span className="menu-heading">{options[0].label}</span>
        { !!options[0].description && <p className="menu-description">{options[0].description}</p> }
      </div>
      : options.map((option, idx) =>
        (<div className="radio" key={`${fieldname}-${idx}`}>
          <label htmlFor={option.value}>
            <Field name={fieldname} component="input" type="radio" value={option.value} required />
            <span className="menu-heading">{option.label}</span>
            { !!option.description && <p className="menu-description">{option.description}</p> }
          </label>
        </div>)) }
  </div>);
};

const Menu = ({ options, guest, hasDiet, childMenu }) =>
  (
    <div>
      <div className="form-group">
        <label className="control-label" htmlFor="foodChoice">What would you like to eat?</label>
        <div className="radio">
          <label htmlFor="childMenu"><Field name={`${guest}.childMenu`} component="input" type="checkbox" /> Child menu</label>
        </div>
        {
          !childMenu &&
            <div>
              {renderOptions(options.adult.starter, `${guest}`, 'starter')}
              {renderOptions(options.adult.main, `${guest}`, 'main', 'Main course')}
              {renderOptions(options.adult.dessert, `${guest}`, 'dessert')}
            </div>
        }
        {
          childMenu &&
          <div>
            {renderOptions(options.child.starter, `${guest}`, 'starter')}
            {renderOptions(options.child.main, `${guest}`, 'main', 'Main course')}
            {renderOptions(options.child.dessert, `${guest}`, 'dessert')}
          </div>
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
  options: React.PropTypes.shape({
    adult: React.PropTypes.shape({
      starter: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired,
      main: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired,
      dessert: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired
    }).isRequired,
    child: React.PropTypes.shape({
      starter: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired,
      main: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired,
      dessert: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string.isRequired,
          label: React.PropTypes.string.isRequired,
          description: React.PropTypes.string
        })
      ).isRequired
    }).isRequired
  }).isRequired,
  guest: React.PropTypes.string.isRequired,
  hasDiet: React.PropTypes.bool.isRequired,
  childMenu: React.PropTypes.bool.isRequired
};

module.exports = Menu;
