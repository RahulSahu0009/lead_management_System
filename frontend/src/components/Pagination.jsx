import PropTypes from 'prop-types';
import { getPageNumbers } from '../utils/helpers.js';
import '../styles/components/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" className="pagination__button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <div className="pagination__pages">
        {pages.map((page) =>
          typeof page === 'number' ? (
            <button
              key={page}
              type="button"
              className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={page} className="pagination__ellipsis">
              &hellip;
            </span>
          ),
        )}
      </div>
      <button type="button" className="pagination__button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;