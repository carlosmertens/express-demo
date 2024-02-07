import config from 'config';
import debug from 'debug';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import auth from './middleware/authenticator.js';
import home from './routes/home.js';
import about from './routes/about.js';
import posts from './routes/posts.js';
import skills from './routes/skills.js';
import express, { json, urlencoded } from 'express';
const app = express();

const log = debug('app:debug');

// Use config package - Do not use it for sensitive info
// console.log('Customer host:', config.get('Customer.dbConfig.host'));
log('Customer host:', config.get('Customer.dbConfig.host'));

// Need to be set manually
log(`NODE_ENV: ${process.env.NODE_ENV}`);
// express is in development by default
log(app.get('env'));

// Use built-in express middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

// Set Environment check
// Test in terminal: $export NODE_ENV=production
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  log('Morgan middleware enable...');
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
app.listen(port, () => log(`Ready on port ${port}...`));
