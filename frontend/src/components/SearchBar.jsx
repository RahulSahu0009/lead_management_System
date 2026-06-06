import PropTypes from 'prop-types';
import '../styles/components/SearchBar.css';

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Search leads...' }) => (
  <form className="search-bar" onSubmit={onSubmit}>
    <input
      className="search-bar__input"
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="Search leads"
    />
    <button type="submit" className="button button--primary">
      Search
    </button>
  </form>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;