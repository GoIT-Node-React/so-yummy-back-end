const express = require("express");
const { user: controller } = require("../../controllers");
const {
    user: middleware,
    auth,
    uploadAvatar,
    isReqDataMissing,
    isUploadAvatarError,
} = require("../../middlewares");

const usersRouter = express.Router();

usersRouter.patch(
    "/",
    auth,
    uploadAvatar.single("avatar"),
    isUploadAvatarError,
    isReqDataMissing,
    middleware.edit,
    controller.editProfile
);

usersRouter.patch(
    "/subscribe",
    auth,
    middleware.subscribe,
    controller.addSubscription
);

module.exports = usersRouter;
