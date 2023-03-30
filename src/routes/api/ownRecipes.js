const express = require("express");
const router = express.Router();
const uploadCloud = require("../../middlewares/uploadRecipeImage");

const {
  getOwnRecipes,
  createRecipe,
  deleteRecipe,
} = require("../../controllers/ownRecipesController");
const { recipe: middleware, auth } = require("../../middlewares");

router.use(auth);
router.get("/", getOwnRecipes);
router.post("/", middleware, uploadCloud.single("thumb"), createRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
