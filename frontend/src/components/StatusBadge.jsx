import PropTypes from 'prop-types';
import { getStatusColorVar, getStatusTextColorVar } from '../utils/helpers.js';
import '../styles/components/StatusBadge.css';

const StatusBadge = ({ status }) => (
  <span
    className={`status-badge status-badge--${status.toLowerCase()}`}
    style={{
      backgroundColor: getStatusColorVar(status),
      color: getStatusTextColorVar(status),
    }}
  >
    {status}
  </span>
);

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;