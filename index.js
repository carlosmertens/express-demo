const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// HANDLE GET REQUESTS

const skills = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Node Js' },
];

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
  const skill = skills.find((skill) => skill.id === parseInt(req.params.id));
  // Page/Resource not found (404)
  if (!skill) res.status(404).send('Sorry, skill not found!');
  res.send(skill);
});

// Query Strings Parameters (url: /api/posts/2024/02?sortBy=name)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
  console.log(req.query);
});

// HANDLE POST REQUESTS

app.post('/api/skills', (req, res) => {
  // Hard Core Validation - Bad Request (404)
  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and min lenght 3 chars!');
  //   return;
  // }

  // Validate with joi schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  //
  const skill = { id: skills.length + 1, name: req.body.name };
  skills.push(skill);
  res.send(skill);
});

// Create port and listen for routes
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ready on port ${port}...`));
