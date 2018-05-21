import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import AuthModel from './auth-model';
import constants from '../../config/constants'

// The e-mail will be our username in this instance
const localOpts = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    // Grab the user from DB
    const user = await AuthModel.findOne({ email });
    // If user doesn't exist
    if (!user) {
      return done(null, false);

      // If user does exist, but password wrong
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    // The user is found in the DB and password matches, return it
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await AuthModel.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
