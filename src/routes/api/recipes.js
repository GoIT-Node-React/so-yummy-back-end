const express = require('express');
const controller = require('../../controllers/recipes');
const { auth: middleware } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.use(middleware.auth);
routerRecipe.get('/', controller.getAllRecipes);
routerRecipe.get('/categories', controller.getCategories);
routerRecipe.get('/main-page', controller.getMainPage);
routerRecipe.get('/categories/:categoryName', controller.getRecipesByCategory);
routerRecipe.get('/:recipesId', controller.getRecipeById);

module.exports = routerRecipe;
