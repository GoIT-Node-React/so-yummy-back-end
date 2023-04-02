const crypto = require('crypto');
const gavatar = require('gravatar');

const { auth: service, user: userService } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { DatabaseError } = require('../../helpers/errors');
const { convertUserData } = require('../../helpers/convertUserData');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const candidate = await userService.getUserByEmail(email);

  if (candidate) {
    throw new DatabaseError('Email is already in use');
  }

  const avatarURL = 'https:' + gavatar.url(email);
  const verificationToken = crypto.randomUUID();
  const user = await service.register({ name, email, password, avatarURL, verificationToken });

  res.status(201).json(
    responseData(
      {
        user: convertUserData(user),
      },
      201
    )
  );
};

module.exports = asyncWrapper(register);
