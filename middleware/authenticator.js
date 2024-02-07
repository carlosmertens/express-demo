// Custom Middleware Function

function auth(req, res, next) {
  console.log('Authentication...');
  next();
}

export default auth;
