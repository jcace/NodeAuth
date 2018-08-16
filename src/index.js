import express from 'express';
import session from 'express-session';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import Routes from './modules';

const app = express();

middlewares(app);

app.use('/api/v1', Routes);
app.use(session({ secret: 'ohgodlol19', resave: false, saveUninitiailized: true }));

// TODO: before deploying, set up a build script for babel https://github.com/babel/example-node-server

// https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
// https://stackoverflow.com/questions/36486397/passport-login-and-persisting-session

app.listen(constants.PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running on port ${constants.PORT}`); // eslint-disable-line
  console.log(`Environment: ${process.env.NODE_ENV}`); // eslint-disable-line
});
