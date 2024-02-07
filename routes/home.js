import { Router } from 'express';

const router = Router();

// HANDLE HTTP GET REQUESTS
router.get('/', (req, res) => {
  res.send('<h1>Hello Express JS!</h1>');
});

export default router;
