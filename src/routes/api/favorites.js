const express = require("express");
const router = express.Router();
const { favorites: controller } = require("../../controllers");

const { auth: authMiddleware } = require("../../middlewares");

router.use(authMiddleware.auth);

router.post("/", controller.addFavorite);
router.get("/", controller.getFavorite);
router.delete("/:id", controller.deleteFavorite);

module.exports = router;
