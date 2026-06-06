import PropTypes from 'prop-types';

const LoadingState = ({ rows = 4 }) => (
  <div className="page-card" style={{ padding: '20px' }}>
    <div className="page-grid" style={{ gap: '12px' }}>
      {Array.from({ length: rows }, (_, index) => (
        <div className="skeleton" key={index} style={{ height: '18px', borderRadius: '999px' }} />
      ))}
    </div>
  </div>
);

LoadingState.propTypes = {
  rows: PropTypes.number,
};

export default LoadingState;