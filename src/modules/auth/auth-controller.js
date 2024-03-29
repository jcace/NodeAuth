import AuthServices from './auth-services';
import { sendVerificationEmail } from './authmailer';

export const signup = async (req, res) => {
  try {
    // Register a new user
    const user = await AuthServices.register(req.body);

    sendVerificationEmail(user.verKey, user.email);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: String(error) });
  }
};

// Login - echo the user back
export const login = (req, res, next) => {
  res.status(200).json(req.user.toAuthJson());

  return next();
};

export const verifyEmail = async (req, res) => {
  try {
    const result = await AuthServices.verify(req.params);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: String(error) });
  }
};
