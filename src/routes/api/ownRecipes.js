const express = require("express");
const router = express.Router();
const uploadCloud = require("../../middlewares/uploadRecipeImage");

const {
  getOwnRecipes,
  createRecipe,
  deleteRecipe,
} = require("../../controllers/ownRecipes");
const { recipe: middleware, auth } = require("../../middlewares");

router.use(auth);
router.get("/", getOwnRecipes);
router.post("/", uploadCloud.single("thumb"), middleware.recipe, createRecipe);
router.delete("/:recipeId", middleware.recipeId, deleteRecipe);

module.exports = router;
