const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { popularRecipes: controller } = require("../../controllers");

router.get("/", auth, controller.getRecipes);

module.exports = router;
