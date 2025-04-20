// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(err.stack);

  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  res.status(status).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler; 