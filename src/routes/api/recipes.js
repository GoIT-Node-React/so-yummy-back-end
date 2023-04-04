const express = require('express');
const controller = require('../../controllers/recipes');
const { auth: authMiddleware, recipe: middleware, pagination: paginationMiddleware } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.use(authMiddleware.auth);
routerRecipe.get('/', paginationMiddleware.pagination, controller.getAllRecipes);
routerRecipe.get('/categories', controller.getCategories);
routerRecipe.get('/main-page', controller.getMainPage);
routerRecipe.get(
  '/categories/:categoryName',
  middleware.recipeCategoryName,
  paginationMiddleware.pagination,
  controller.getRecipesByCategory
);
routerRecipe.get('/:recipeId', middleware.recipeId, controller.getRecipeById);

module.exports = routerRecipe;
