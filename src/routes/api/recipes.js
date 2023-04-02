const express = require('express');
const  controller  = require('../../controllers/recipes');
const { auth } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.get('/', auth, controller.getAllRecipes);

routerRecipe.get('/categories', auth, controller.getCategories);

routerRecipe.get('/main-page', auth, controller.getMainPage);

routerRecipe.get('/categories/:categoryName', auth, controller.getRecipesByCategory);

routerRecipe.get('/:recipesId', auth, controller.getRecipeById);

module.exports = routerRecipe;
