const express = require('express');
const controller = require('../../controllers/recipes');
const { auth: middleware } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.use(middleware.auth);
routerRecipe.get('/', controller.getAllRecipes);
routerRecipe.get('/categories', controller.getCategories);
routerRecipe.get('/main-page', controller.getMainPage);
routerRecipe.get('/categories/:categoryName', controller.getRecipesByCategory); // перевірка на належність categoryName до масиву CATEGORIES
routerRecipe.get('/:recipesId', controller.getRecipeById); // recipesId був ObjectId

module.exports = routerRecipe;
