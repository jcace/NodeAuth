// http://URL/api/v1/
import { Router } from 'express';

import authRoutes from './auth';
import AuthServices from './auth/auth-services';

const routes = new Router();

routes.use('/auth', authRoutes);

// request goes thru jwt middleware first
routes.get('/helloworld', AuthServices.jwtMiddleware, (req, res) => {
  console.log(req.user.verified);
  res.send('If you see this, you have logged in.');
});

export default routes;
