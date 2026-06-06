import { useToast } from '../context/ToastContext.jsx';
import '../styles/components/Toast.css';

const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <p>{toast.message}</p>
          <button type="button" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;