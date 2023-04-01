const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");
const { achievements: controller } = require("../../controllers");

router.get("/", auth, controller.get);

module.exports = router;
