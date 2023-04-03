const express = require('express');
const { user: controller } = require('../../controllers');
const {
  user: middleware,
  auth: authMiddleware,
  uploadAvatar,
  isReqDataMissing,
  isUploadAvatarError,
} = require('../../middlewares');

const usersRouter = express.Router();

usersRouter.use(authMiddleware.auth);
usersRouter.patch(
  '/',
  uploadAvatar.single('avatar'),
  isUploadAvatarError,
  isReqDataMissing,
  middleware.edit,
  controller.editProfile
);

usersRouter.patch('/subscribe', middleware.subscribe, controller.addSubscription);

module.exports = usersRouter;
