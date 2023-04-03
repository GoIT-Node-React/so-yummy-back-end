const crypto = require('crypto');
const gavatar = require('gravatar');
require('dotenv').config();

const { user: service } = require('../services');
const { asyncWrapper, responseData } = require('../helpers/apiHelpers');
const { DatabaseError, NotFoundError } = require('../helpers/errors');
const { convertUserData } = require('../helpers/convertUserData');

const editProfile = async (req, res, next) => {
  const { id } = req.user;
  const { name: newName } = req.body;
  const { name: currentName } = req.user;
  const imageUrl = req?.file?.path;

  const updateDataObj = {};

  if (newName && newName !== currentName && imageUrl) {
    updateDataObj.name = newName;
    updateDataObj.avatarURL = imageUrl;
  }

  if (newName === currentName && imageUrl) {
    updateDataObj.avatarURL = imageUrl;
  }

  if (!newName && imageUrl) {
    updateDataObj.avatarURL = imageUrl;
  }

  if (newName !== currentName && !imageUrl) {
    updateDataObj.name = newName;
  }

  if (Object.keys(updateDataObj).length === 0) {
    res.status(200).json(
      responseData(
        {
          user: convertUserData(req.user),
        },
        200
      )
    );
  }

  const user = await service.updateUserProfile(id, updateDataObj);
  res.status(200).json(
    responseData(
      {
        user: convertUserData(user),
      },
      200
    )
  );
};

const addSubscription = async (req, res, next) => {
  const { id } = req.user;
  const { email } = req.body;

  const { currentUserProfile, userSubscribedByEmail } = await service.checkSubscriptionStatus(id, email);

  const isSubscribed = currentUserProfile?.subscription === email;
  const isSubscribedAtAnotherEmail =
    currentUserProfile?.subscription !== null &&
    currentUserProfile?.subscription !== '' &&
    currentUserProfile?.subscription !== email;
  const isEmailBusyByAnotherUser = userSubscribedByEmail && userSubscribedByEmail?._id !== id;

  if (isSubscribedAtAnotherEmail) {
    throw new DatabaseError('You are already subscribed to the newsletter but with a different email address');
  }

  if (isSubscribed) {
    throw new DatabaseError('You are already subscribed to the newsletter');
  }

  if (isEmailBusyByAnotherUser) {
    throw new DatabaseError('This email address is already subscribed by another user');
  }

  const updatedUser = await service.updateUserProfile(id, {
    subscription: email,
  });

  if (!updatedUser) {
    throw new NotFoundError('User is not found');
  }

  res.status(200).json(
    responseData(
      {
        user: convertUserData(updatedUser),
      },
      200
    )
  );
};

module.exports = {
  editProfile: asyncWrapper(editProfile),
  addSubscription: asyncWrapper(addSubscription),

  // verify: asyncWrapper(verify),
  // sendVerifyMail: asyncWrapper(sendVerifyMail),
};
