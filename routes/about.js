import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  res.send('<h1>About Page!</h1>');
});

export default route;
