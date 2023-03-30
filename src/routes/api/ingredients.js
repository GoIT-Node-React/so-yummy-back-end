const express = require("express");
const router = express.Router();

const { ingredients: middleware } = require("../../middlewares");
const { ingredients: controller } = require("../../controllers");

router.get("/", middleware.getIngredients, controller.getIngredientsController);

module.exports = router;
