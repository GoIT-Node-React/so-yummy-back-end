const express = require("express");
const { user: controller, achievements } = require("../../controllers");
const {
  user: middleware,
  auth: authMiddleware,
  uploadImage: { avatarImage },
} = require("../../middlewares");

const usersRouter = express.Router();

usersRouter.use(authMiddleware.auth);
usersRouter.patch(
  "/",
  avatarImage.single("avatar"),
  middleware.noData,
  middleware.edit,
  controller.editProfile
);
usersRouter.patch(
  "/subscribe",
  middleware.subscribe,
  controller.addSubscription
);
usersRouter.get("/achievements", achievements.get);
module.exports = usersRouter;
