const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Express JS!</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page!</h1>');
});

app.get('/api/skills', (req, res) => {
  res.send(['js', 'ts', 'nodejs']);
});

// Routes Parameters (:id)
app.get('/api/skills/:id', (req, res) => {
  res.send(`<h1>${req.params.id}</h1>`);
});

// Query Strings Parameters (url: /api/posts/2024/02?sortBy=name)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
  console.log(req.query);
});

// Create port and listen for routes
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ready on port ${port}...`));
