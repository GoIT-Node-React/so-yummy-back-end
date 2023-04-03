const express = require('express');
const router = express.Router();

const {
  auth: authMiddleware,
  uploadImage: { recipeImage },
  recipe: middleware,
  pagination: paginationMiddleware,
} = require('../../middlewares');
const { ownRecipes: controller } = require('../../controllers');

router.use(authMiddleware.auth);

router.get('/', paginationMiddleware.pagination, controller.getOwnRecipes);
router.post('/', recipeImage.single('thumb'), middleware.recipe, controller.createRecipe);
router.delete('/:recipeId', middleware.recipeId, controller.deleteRecipe);

module.exports = router;
