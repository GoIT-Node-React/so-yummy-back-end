const { User } = require('../models');

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

// Get user by refresh token
const getUserByRefreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });

  return user;
};

module.exports = {
  getUserByEmail,
  getUserByRefreshToken,
  getUserByVerificationToken,
  getUserById,
};
