import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ToastContext = createContext(null);
let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const pushToast = (type, message) => {
    const id = toastId += 1;
    setToasts((currentToasts) => [...currentToasts, { id, type, message }]);

    window.setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const value = useMemo(
    () => ({
      toasts,
      addToast: (message, type = 'info') => pushToast(type, message),
      success: (message) => pushToast('success', message),
      error: (message) => pushToast('error', message),
      info: (message) => pushToast('info', message),
      dismiss: removeToast,
    }),
    [toasts],
  );

  useEffect(() => () => setToasts([]), []);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
};