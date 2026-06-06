import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers.js';
import StatusBadge from './StatusBadge.jsx';
import '../styles/components/LeadTable.css';

const ActionButton = ({ label, onClick, to, variant = 'ghost' }) => {
  const className = `icon-button icon-button--${variant}`;
  const iconMap = {
    View: '↗',
    Edit: '✎',
    Delete: '×',
  };
  const icon = iconMap[label] || label;

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label} title={label}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} aria-label={label} title={label}>
      {icon}
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  variant: PropTypes.oneOf(['ghost', 'danger']),
};

const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-state__illustration" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <h3>No leads found</h3>
    <p>Try a different search or clear the filters to reveal more records.</p>
  </div>
);

const LeadTable = ({ leads, loading, onView, onEdit, onDelete, compact = false, showActions = true }) => {
  if (loading) {
    return (
      <div className="table-skeleton">
        {Array.from({ length: compact ? 3 : 6 }, (_, index) => (
          <div className="table-skeleton__row" key={index}>
            <span className="skeleton" />
            <span className="skeleton" />
            <span className="skeleton" />
            <span className="skeleton" />
          </div>
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return <EmptyState />;
  }

  return (
    <div className="lead-table-wrap">
      <table className={`lead-table ${compact ? 'lead-table--compact' : ''}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created</th>
            {showActions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td data-label="Name">{lead.name}</td>
              <td data-label="Email">{lead.email}</td>
              <td data-label="Phone">{lead.phone}</td>
              <td data-label="Company">{lead.company}</td>
              <td data-label="Status"><StatusBadge status={lead.status} /></td>
              <td data-label="Created">{formatDate(lead.createdAt)}</td>
              {showActions ? (
                <td data-label="Actions">
                  <div className="lead-table__actions">
                    {onView ? <ActionButton label="View" to={onView(lead)} /> : null}
                    {onEdit ? <ActionButton label="Edit" to={onEdit(lead)} /> : null}
                    {onDelete ? <ActionButton label="Delete" onClick={() => onDelete(lead)} variant="danger" /> : null}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  compact: PropTypes.bool,
  showActions: PropTypes.bool,
};

export default LeadTable;