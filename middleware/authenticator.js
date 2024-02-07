// Custom Middleware Function
function auth(req, res, next) {
  console.log('Authentication...');
  req.admin = 'Mertens';
  next();
}

export default auth;
