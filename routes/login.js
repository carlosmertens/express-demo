import { Router } from 'express';
import auth from '../middleware/authenticator.js';

const router = Router();

// Use custom middleware auth
router.get('/', auth, (req, res) => {
  console.log(`Welcome ${req.admin}`);
  res.send(req.admin);
});

export default router;
