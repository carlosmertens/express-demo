const express = require('express');

const router = express.Router();

// HANDLE HTTP GET REQUESTS
router.get('/', (req, res) => {
  res.send('<h1>Hello Express JS!</h1>');
});

module.exports = router;
