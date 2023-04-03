const express = require('express');
const router = express.Router();

const {
  auth: authMiddleware,
  upload,
  recipe: middleware,
  pagination: paginationMiddleware,
} = require('../../middlewares');
const { ownRecipes: controller } = require('../../controllers');

router.use(authMiddleware.auth);

router.get('/', paginationMiddleware.pagination, controller.getOwnRecipes);
router.post('/', upload.single('thumb'), middleware.recipe, controller.createRecipe);
router.delete('/:recipeId', middleware.recipeId, controller.deleteRecipe);

module.exports = router;
