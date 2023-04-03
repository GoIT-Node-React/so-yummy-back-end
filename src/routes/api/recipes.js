const express = require('express');
const controller = require('../../controllers/recipes');
const { auth: authMiddleware, recipe: middleware } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.use(authMiddleware.auth);
routerRecipe.get('/', controller.getAllRecipes);
routerRecipe.get('/categories', controller.getCategories);
routerRecipe.get('/main-page', controller.getMainPage);
routerRecipe.get('/categories/:categoryName', middleware.recipeCategoryName, controller.getRecipesByCategory); // перевірка на належність categoryName до масиву CATEGORIES
routerRecipe.get('/:recipesId', middleware.recipeId, controller.getRecipeById); // recipesId був ObjectId

module.exports = routerRecipe;
