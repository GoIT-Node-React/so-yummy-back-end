const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UnAuthorizedError } = require('../helpers/errors');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

// Registrer user
const register = async (candidate) => {
  const user = new User(candidate);
  await user.save();

  return user;
};

// Login
const login = async (candidate) => {
  const user = await getUserByEmail(candidate.email);

  if (!user || !(await user.validPassword(candidate.password))) {
    throw new UnAuthorizedError('Email or password is wrong');
  }

  // TODO: Add email verification check
  // if (!user.verify) {
  //   throw new UnAuthorizedError('Please, verify your email');
  // }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  await user.updateOne({ token }, { new: true });

  return { token, user };
};

// Logout
const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });

  return true;
};

// Get user by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

// Get user by email verification token
const getUserByVerificationToken = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  return user;
};

// Get user by id
const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

module.exports = {
  register,
  login,
  logout,
  getUserByEmail,
  getUserByVerificationToken,
  getUserById,
};
