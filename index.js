import config from 'config';
import debug from 'debug';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import home from './routes/home.js';
import about from './routes/about.js';
import login from './routes/login.js';
import posts from './routes/posts.js';
import skills from './routes/skills.js';
import express, { json, urlencoded } from 'express';

const app = express();

// Replace console.log() with debug pachage
const log = debug('app:debug');

// Use config package - Do not use it for sensitive info
// console.log('Customer host:', config.get('Customer.dbConfig.host'));
log('Customer host:', config.get('Customer.dbConfig.host'));

// Need to be set manually
log(`NODE_ENV: ${process.env.NODE_ENV}`);
// express is in development by default
log(app.get('env'));

// Set Environment check
// Test in terminal: $export NODE_ENV=production
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  log('Morgan middleware enable...');
}

// Use built-in express middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

// Use custom middleware function
app.use(logger);

// Use routes with middleware
app.use('/', home);
app.use('/about', about);
app.use('/login', login);
app.use('/api/skills', skills);
app.use('/api/posts', posts);

// PORT & LISTENER
const port = process.env.PORT || 3000;
app.listen(port, () => log(`Ready on port ${port}...`));
