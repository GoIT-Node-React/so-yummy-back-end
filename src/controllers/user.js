const crypto = require("crypto");
const gavatar = require("gravatar");
require("dotenv").config();

const { user: service } = require("../services");
const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const {
    DatabaseError,
    NotFoundError,
    ValidationError,
} = require("../helpers/errors");
const { convertUserData } = require("../helpers/convertUserData");

const cloudinary = require("cloudinary").v2;
const { User } = require("../models");

// TODO: Email verification
/* require('dotenv').config();
const { MAIL_API_KEY, SERVER_URL } = process.env;
sgMail.setApiKey(MAIL_API_KEY);

const sendVerificationMail = async (email, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: 'dev.andrii.zaimak@ukr.net',
      subject: 'Thank you for registration!',
      text: `Please, confirm your email address ${SERVER_URL}/api/users/verify/${verificationToken}`,
      html: `Please, confirm your email address ${SERVER_URL}/api/users/verify/${verificationToken}`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error(error.response.body);
  }
}; */

// Registration user
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const candidate = await service.getUserByEmail(email);

    if (candidate) {
        throw new DatabaseError("Email is already in use");
    }

    const avatarURL = "https:" + gavatar.url(email);
    const verificationToken = crypto.randomUUID();
    const user = await service.register({
        name,
        email,
        password,
        avatarURL,
        verificationToken,
    });

    // TODO: Send verification email
    // await sendVerificationMail(email, verificationToken);

    res.status(201).json(
        responseData(
            {
                user: convertUserData(user),
            },
            201
        )
    );
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await service.login({ email, password });

    res.status(200).json(
        responseData(
            {
                token,
                user: convertUserData(user),
            },
            200
        )
    );
};

// Logout user
const logout = async (req, res) => {
    const { id } = req.user;

    await service.logout(id);

    res.sendStatus(204);
};

// Get user info by user token
const currentUser = async (req, res) => {
    res.status(200).json(responseData(req.user, 200));
};

// Verification user by email
/* const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await service.getUserByVerificationToken(verificationToken);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.updateOne({ verificationToken: null, verify: true });

  res.status(200).json(responseData({ message: 'Verification successful' }, 200));
}; */

// Send verification email
/* const sendVerifyMail = async (req, res) => {
  const { email } = req.body;

  const user = await service.getUserByEmail(email);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.verify) {
    throw new ValidationError('Verification has already been passed');
  }

  const verificationToken = crypto.randomUUID();
  await user.updateOne({ verificationToken });

  sendVerificationMail(user.email, verificationToken);

  res.status(200).json(responseData({ message: `Verification email sent` }, 200));
};*/

const editProfile = async (req, res, next) => {
    if (!req?.file && !req.body?.name) {
        throw new ValidationError("No data to update. Bad Request");
    }

    const { id } = req.user;
    const { name: newName } = req.body;
    const { name: currentName } = req.user;
    const imageUrl = req?.file?.path;
    let user = null;

    if (newName && newName !== currentName && imageUrl) {
        user = await service.updateUserProfile(id, {
            name: newName,
            avatarURL: imageUrl,
        });
    } else if (newName === currentName && imageUrl) {
        user = await service.updateUserProfile(id, { avatarUrl: imageUrl });
    } else if (!newName && imageUrl) {
        user = await service.updateUserProfile(id, { avatarUrl: imageUrl });
    } else if (newName !== currentName && !imageUrl) {
        user = await service.updateUserProfile(id, { name: newName });
    } else {
        user = req.user;
    }

    if (!user) {
        throw new NotFoundError("User is not found");
    }

    res.status(200).json(
        responseData(
            {
                name: user.name,
                avatarURL: user.avatarURL,
            },
            200
        )
    );
};

const addSubscription = async (req, res, next) => {
    const { id } = req.user;
    const { email } = req.body;

    const {
        isAlreadySubscribed,
        isEmailBusyByCurrentUser,
        isEmailBusyByAnotherUser,
    } = await service.checkSubscriptionStatus(id, email);

    if (isAlreadySubscribed) {
        throw new DatabaseError(
            "You are already subscribed to the newsletter but with a different email address"
        );
    }

    if (isEmailBusyByCurrentUser) {
        throw new DatabaseError("You are already subscribed to the newsletter");
    }

    if (isEmailBusyByAnotherUser) {
        throw new DatabaseError(
            "This email address is already subscribed by another user"
        );
    }

    const updatedUser = await service.updateUserProfile(id, {
        subscription: email,
    });

    if (!updatedUser) {
        throw new NotFoundError("User is not found");
    }

    res.status(200).json(
        responseData(
            {
                subscription: updatedUser.subscription,
            },
            200
        )
    );
};

module.exports = {
    login: asyncWrapper(login),
    register: asyncWrapper(register),
    logout: asyncWrapper(logout),
    currentUser: asyncWrapper(currentUser),
    editProfile: asyncWrapper(editProfile),
    addSubscription: asyncWrapper(addSubscription),

    // verify: asyncWrapper(verify),
    // sendVerifyMail: asyncWrapper(sendVerifyMail),
};
