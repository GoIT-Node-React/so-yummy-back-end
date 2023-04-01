const express = require("express");
const router = express.Router();

const { recipe: middleware, auth, upload } = require("../../middlewares");
const { ownRecipes: controller } = require("../../controllers");

router.use(auth);
router.get("/", controller.getOwnRecipes);
router.post(
  "/",
  upload.single("thumb"),
  middleware.recipe,
  controller.createRecipe
);
router.delete("/:recipeId", middleware.recipeId, controller.deleteRecipe);

module.exports = router;
