export const errorHandler = (err, req, res, next) => {
  console.error('\n❌ ERROR OCCURRED:');
  console.error('Path:', req.method, req.originalUrl);
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('\n');
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};
