const express = require("express");
const router = express.Router();
const uploadCloud = require("../../middlewares/uploadRecipeImage");

const {
  getOwnRecipes,
  createRecipe,
  deleteRecipe,
} = require("../../controllers/ownRecipesController");

router.get("/", getOwnRecipes);
router.post("/", uploadCloud.single("thumb"), createRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
