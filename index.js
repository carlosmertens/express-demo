const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
  res.send('<p>About Page!</p>');
});

app.get('/api/skills', (req, res) => {
  res.send(['js', 'ts', 'nodejs']);
});

app.listen(3000, () => console.log('Server ready on port 3000...'));
