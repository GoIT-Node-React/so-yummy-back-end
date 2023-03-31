const express = require("express");
const { user: controller } = require("../../controllers");
const { user: middleware, auth, uploadAvatar } = require("../../middlewares");

const usersRouter = express.Router();

usersRouter.patch(
    "/",
    auth,
    middleware.edit,
    uploadAvatar.single("avatar"),
    controller.editProfile
);

usersRouter.patch(
    "/subscribe",
    auth,
    middleware.subscribe,
    controller.addSubscription
);

module.exports = usersRouter;
