import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';

/**
 * Schema definine a user auth
 */
const AuthSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator(email) {
        // Check for valid E-mail string
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validator(password) {
      return password.length >= 6 && password.match(/\d+/g);
    },
    message: 'Not a valid password!',
  },
  username: String,
});

AuthSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

/**
 * Before anything is saved in the DB using this schema, execute the function
 */
AuthSchema.pre('save', function(next) {
  // If the password was changed,
  if (this.isModified('password')) {
    // Rewrite password with hashed password
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

AuthSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  /**
   * Returns true if user's password matches, false if not
   * @param {*} password Hashed password to compare
   */
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  // user.createToken()
  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },

  toAuthJson() {
    return {
      token: this.createToken(),
      ...this.toJSON(),
    };
  },

  // override the toJSON method to make sure we don't send the password back

  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
    };
  },
};

export default mongoose.model('Auth', AuthSchema);
