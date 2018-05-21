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
      return AuthModel.create({ email, password, username });
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
