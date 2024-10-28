const errorHandler = (err, req, res, next) => {
  // Default to 500 server error if no status code is set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set status code
  res.status(statusCode);
  
  // Send error response
  res.json({
    status: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });
};

export default errorHandler;
