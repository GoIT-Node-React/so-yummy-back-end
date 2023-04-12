const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UnAuthorizedError } = require('../helpers/errors');
const { User } = require('../models');
const { getUserByEmail } = require('./user');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

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

  const payload = {
    id: user._id,
  };
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

  await user.updateOne({ refreshToken, accessToken }, { new: true });

  return { refreshToken, accessToken, user };
};

// Logout
const logout = async (id) => {
  await User.findByIdAndUpdate(id, { accessToken: null, refreshToken: null });

  return true;
};

// Generate ne tokens and update token by user id
const updateTokensById = async (id) => {
  const payload = {
    id,
  };

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });

  const user = await User.findByIdAndUpdate(id, { refreshToken, accessToken }, { new: true });

  return { refreshToken, accessToken, user };
};

module.exports = {
  register,
  login,
  logout,
  updateTokensById,
};
