export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || (error.name === 'ValidationError' || error.code === 11000 || error.name === 'CastError' ? 400 : 500);
  const message =
    error.code === 11000
      ? 'A lead with this email already exists'
      : error.name === 'CastError'
        ? 'Invalid lead id'
        : error.message || 'Server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};