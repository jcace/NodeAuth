// http://URL/api/v1/
import { Router } from 'express';

import authRoutes from './auth';
import AuthServices from './auth/auth-services';


const routes = new Router();

routes.use('/auth', authRoutes);

routes.get('/test', (req,res) => {
  if (!req.session.user) {
    return res.status(401).send();
  }
  return res.status(200).send("Logged in!");
});

// request goes thru jwt middleware first
routes.get('/helloworld', AuthServices.jwtMiddleware, (req, res) => {
  console.log(req.user.verified);
  res.send('If you see this, you have logged in.');
});

export default routes;
