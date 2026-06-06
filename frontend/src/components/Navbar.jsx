import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/Navbar.css';

const pageTitleMap = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/leads/new': 'Add Lead',
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const title =
    pageTitleMap[location.pathname] ||
    (location.pathname.endsWith('/edit') ? 'Edit Lead' : location.pathname.startsWith('/leads/') ? 'Lead Details' : 'Lead Management CRM');

  return (
    <header className="topbar">
      <div className="topbar__inner container">
        <button type="button" className="topbar__menu" onClick={onMenuClick} aria-label="Toggle navigation menu">
          ☰
        </button>
        <div>
          <h1 className="topbar__title">{title}</h1>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Navbar;