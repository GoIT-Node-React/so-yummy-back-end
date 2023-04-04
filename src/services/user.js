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

// updateUserProfileData
const updateUserProfile = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return user;
};

const checkSubscriptionStatus = async (id, email) => {
  const [currentUserProfile, userSubscribedByEmail] = await Promise.all([
    User.findById(id),
    User.findOne({ subscription: email }),
  ]);

  return { currentUserProfile, userSubscribedByEmail };
};

module.exports = {
  getUserByEmail,
  getUserByRefreshToken,
  getUserByVerificationToken,
  getUserById,
  updateUserProfile,
  checkSubscriptionStatus,
};
