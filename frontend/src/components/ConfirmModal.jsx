import PropTypes from 'prop-types';
import '../styles/components/ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => (
  <div className={`confirm-modal ${isOpen ? 'confirm-modal--open' : ''}`} aria-hidden={!isOpen}>
    <div className="confirm-modal__overlay" onClick={onCancel} role="presentation" />
    <div className="confirm-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <h3 id="confirm-title">Confirm action</h3>
      <p>{message}</p>
      <div className="confirm-modal__actions">
        <button type="button" className="button button--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="button button--danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;