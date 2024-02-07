const config = require('config');
const debug = require('debug')('app:debug');
const serverLog = require('debug')('app:Server:');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/authenticator');
const home = require('./routes/home');
const about = require('./routes/about');
const posts = require('./routes/posts');
const skills = require('./routes/skills');
const express = require('express');
const app = express();

// Use config package - Do not use it for sensitive info
// console.log('Customer host:', config.get('Customer.dbConfig.host'));
debug('Customer host:', config.get('Customer.dbConfig.host'));

// Need to be set manually
debug(`NODE_ENV: ${process.env.NODE_ENV}`);
// express is in development by default
debug(app.get('env'));

// Use built-in express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set Environment check
// Test in terminal: $export NODE_ENV=production
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan middleware enable...');
}

// Use custom middleware function
app.use(logger);
app.use(auth);

// Use routes with middleware
app.use('/', home);
app.use('/about', about);
app.use('/api/skills', skills);
app.use('/api/posts', posts);

// PORT & LISTENER
const port = process.env.PORT || 3000;
app.listen(port, () => serverLog(`Ready on port ${port}...`));
