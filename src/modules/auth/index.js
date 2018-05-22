// http://URL/api/v1/auth/
import { Router } from 'express';

import * as authController from './auth-controller';
import AuthServices from './auth-services';

const routes = new Router();

routes.post('/register', authController.signup);

// Login endpoint, send the data to middleware, take result and send to authcontroller.login to return the result
routes.post('/login', AuthServices.loginMiddleware, authController.login);

routes.get('/verify/:email/:token', authController.verifyEmail);

export default routes;
