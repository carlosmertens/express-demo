const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const auth = require('./authenticator');
const express = require('express');
const app = express();

// Use config package - Do not use it for sensitive info
console.log('Customer host:', config.get('Customer.dbConfig.host'));

// Need to be set manually
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// express is in development by default
console.log(app.get('env'));

// Use built-in express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use custom middleware function
app.use(logger);
app.use(auth);

// Set Environment check
// Test in terminal: $export NODE_ENV=production
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan middleware enable...');
}

// Data
const skills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Node Js' },
];

// HANDLE HTTP GET REQUESTS
app.get('/', (req, res) => {
  res.send('<h1>Hello Express JS!</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page!</h1>');
});

app.get('/api/skills', (req, res) => {
  res.send(skills);
});

// Routes Parameters (:id)
app.get('/api/skills/:id', (req, res) => {
  // Find skill id, if not exist, return 404 - Page not found
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('Sorry, page not found!');

  res.send(skill);
});

// Query Strings Parameters (url: /api/posts/2024/02?sortBy=name)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
  console.log(req.query);
});

// HANDLE HTTP POST REQUEST
app.post('/api/skills', (req, res) => {
  // Hard Core Validation - Bad Request (400)
  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and min lenght 3 chars!');
  //   return;
  // }

  // Validate with joi schema, if not exist, return 400 - Bad request
  const { error } = validateSkill(req.body);
  if (error) return res.status(400).send(error.message);

  // Create new skill
  const skill = { id: skills.length + 1, name: req.body.name };
  skills.push(skill);
  res.send(skill);
});

// HANDLE HTTP PUT REQUEST
app.put('/api/skills/:id', (req, res) => {
  // Find skill, if not exist, return 404
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('The skill was not found!');

  // Validate skill, if invalid, return 400
  const { error } = validateSkill(req.body);
  if (error) return res.status(400).send(error.message);

  // Update skill, return the updated sill
  skill.name = req.body.name;
  res.send(skill);
});

// HANDLE HTTP DELETE REQUEST
app.delete('/api/skills/:id', (req, res) => {
  // Find skill, if not exist, return 404
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  if (!skill) return res.status(404).send('The skill does not exist!');

  // Delete skill and return deleted skill
  const index = skills.indexOf(skill);
  skills.splice(index, 1);

  res.send(skill);
});

// PORT & LISTENER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ready on port ${port}...`));

// Function to validate skill with joi schema
function validateSkill(skill) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(skill);
}
