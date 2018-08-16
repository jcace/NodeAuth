import randomstring from 'randomstring';
import AuthModel from './auth-model';
import { authLocal, authJwt } from './passport';

class AuthServices {
  /**
   * Register a brand new user
   * @param {*}
   */
  register({ email, password, username }) {
    if (!email) {
      throw new Error('Email is required');
    } else if (!password) {
      throw new Error('Password is required');
    } else if (!username) {
      throw new Error('Username is required');
    }

    try {
      const verified = false;
      // Generate a token for e-mail verification later
      const verKey = randomstring.generate({
        length: 64,
      });

      return AuthModel.create({ email, password, username, verified, verKey });
    } catch (error) {
      throw error;
    }
  }

  // ! These errors aren't caught by the calling try/catch?
  verify({ email, token }) {
    try {
      AuthModel.findOne({ email: email }, (err, user) => {
        if (!user) {
          throw Error('User does not exist');
        }
        if (user.verKey !== token) {
          return new Error('Verification token is invalid or user already verified');
        } else {
          return AuthModel.findOneAndUpdate({ email: email }, { verified: 'true', verKey: null }, (err, resp) => {
            return resp;
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Attempt to login a new user (using local DB)
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  loginMiddleware(req, res, next) {
    return authLocal(req, res, next);
  }

  jwtMiddleware(req, res, next) {
    return authJwt(req, res, next);
  }
}

export default new AuthServices();
