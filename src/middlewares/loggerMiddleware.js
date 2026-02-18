export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log('\n========================================');
  console.log(`[${timestamp}]`);
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('========================================\n');
  
  next();
};
