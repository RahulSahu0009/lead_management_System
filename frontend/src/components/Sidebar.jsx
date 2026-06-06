import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/components/Sidebar.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '◩' },
  { to: '/leads', label: 'Leads', icon: '◫' },
  { to: '/leads/new', label: 'Add Lead', icon: '+' },
];

const Sidebar = ({ isOpen = true }) => (
  <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
    <div className="sidebar__brand">
      <div className="sidebar__logo">LF</div>
      <div className="sidebar__brand-copy">
        <strong>LeadFlow</strong>
        <span>CRM</span>
      </div>
    </div>
    <nav className="sidebar__nav" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}>
          <span className="sidebar__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="sidebar__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
};

export default Sidebar;