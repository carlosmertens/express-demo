const express = require('express');

const router = express.Router();

// Query Strings Parameters (url: /api/posts/2024/02?sortBy=name)
router.get('/:year/:month', (req, res) => {
  res.send(req.params);
  console.log(req.query);
});

module.exports = router;
