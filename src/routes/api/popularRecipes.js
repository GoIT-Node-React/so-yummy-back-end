const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares");
const { getRecipes } = require("../../controllers/popularRecipes");

router.get("/", auth, getRecipes);

module.exports = router;
