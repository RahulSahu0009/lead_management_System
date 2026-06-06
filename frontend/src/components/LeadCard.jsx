import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers.js';
import StatusBadge from './StatusBadge.jsx';
import '../styles/components/LeadCard.css';

const LeadCard = ({ lead }) => (
  <article className="lead-card">
    <div className="lead-card__header">
      <div>
        <h3>{lead.name}</h3>
        <p>{lead.company}</p>
      </div>
      <StatusBadge status={lead.status} />
    </div>
    <div className="lead-card__body">
      <span>{lead.email}</span>
      <span>{lead.phone}</span>
      <span>Created {formatDate(lead.createdAt)}</span>
    </div>
    <div className="lead-card__actions">
      <Link className="button button--ghost" to={`/leads/${lead._id}`}>
        View
      </Link>
    </div>
  </article>
);

LeadCard.propTypes = {
  lead: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default LeadCard;