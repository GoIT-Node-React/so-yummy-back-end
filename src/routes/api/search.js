const express = require("express");
const router = express.Router();

const { search: middleware } = require("../../middlewares");
const { search: controller } = require("../../controllers");

router.get(
  "/",
  middleware.getRecipeByTitle,
  controller.getRecipeByTitleController
);

module.exports = router;
