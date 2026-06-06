const createLogger = (level) => {
  const timestamp = () => new Date().toISOString();

  return (message, meta = {}) => {
    const payload = {
      level,
      timestamp: timestamp(),
      message,
      ...meta,
    };

    if (level === 'error') {
      console.error(JSON.stringify(payload));
      return;
    }

    if (level === 'warn') {
      console.warn(JSON.stringify(payload));
      return;
    }

    console.info(JSON.stringify(payload));
  };
};

export const logger = {
  info: createLogger('info'),
  warn: createLogger('warn'),
  error: createLogger('error'),
};