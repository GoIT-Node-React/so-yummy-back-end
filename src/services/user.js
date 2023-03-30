const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('../helpers/errors');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

// Return correct user object with needed fields
const convertUserData = (user) => {
  const { _id: id, name, email, subscription, avatarURL } = user;

  return { id, name, email, subscription, avatarURL };
};

// Registrer user
const register = async (candidate) => {
  const user = new UserModel(candidate);
  await user.save();

  return convertUserData(user);
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
  await user.updateOne({ token });

  return { token, user: convertUserData(user) };
};

// Logout
const logout = async (id) => {
  await UserModel.findByIdAndUpdate(id, { token: null });

  return true;
};

// Get user by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return convertUserData(user);
};

// Get user by email verification token
const getUserByVerificationToken = async (verificationToken) => {
  const user = await UserModel.findOne({ verificationToken });

  return convertUserData(user);
};

// Get user by id
const getUserById = async (id) => {
  const user = await UserModel.findById(id);

  return convertUserData(user);
};

module.exports = {
  register,
  login,
  logout,
  getUserByEmail,
  getUserByVerificationToken,
  getUserById,
};
