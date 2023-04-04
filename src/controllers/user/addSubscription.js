const { user: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { DatabaseError, NotFoundError } = require('../../helpers/errors');
const { convertUserData } = require('../../helpers/convertUserData');

const addSubscription = async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  const { currentUserProfile, userSubscribedByEmail } = await service.checkSubscriptionStatus(id, email);

  const isSubscribed = currentUserProfile?.subscription === email;
  const isSubscribedAtAnotherEmail =
    currentUserProfile?.subscription !== '' && currentUserProfile?.subscription !== email;
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

module.exports = asyncWrapper(addSubscription);
