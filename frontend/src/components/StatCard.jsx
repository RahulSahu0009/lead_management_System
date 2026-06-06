import PropTypes from 'prop-types';
import '../styles/components/StatCard.css';

const toneClassMap = {
  primary: 'stat-card--primary',
  accent: 'stat-card--accent',
  teal: 'stat-card--teal',
  success: 'stat-card--success',
  danger: 'stat-card--danger',
};

const StatCard = ({ title, value, subtitle, tone = 'primary' }) => (
  <article className={`stat-card ${toneClassMap[tone] || toneClassMap.primary}`}>
    <span className="stat-card__label">{title}</span>
    <strong className="stat-card__value">{value}</strong>
    {subtitle ? <span className="stat-card__subtitle">{subtitle}</span> : null}
  </article>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  tone: PropTypes.oneOf(['primary', 'accent', 'teal', 'success', 'danger']),
};

export default StatCard;