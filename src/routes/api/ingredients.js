const express = require("express");
const router = express.Router();

const { ingredients: middleware } = require("../../middlewares");
const { ingredients: controller } = require("../../controllers");

router.get(
  "/",
  middleware.getRecipeByIngredient,
  controller.getRecipeByIngredientController
);

module.exports = router;
