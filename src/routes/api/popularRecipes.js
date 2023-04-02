const express = require("express");

const router = express.Router();

const {
  auth: authMiddleware,
  recipe: middleware,
} = require("../../middlewares");
const { popularRecipes: controller } = require("../../controllers");

router.get("/", authMiddleware.auth, middleware.query, controller.getRecipes);

module.exports = router;
