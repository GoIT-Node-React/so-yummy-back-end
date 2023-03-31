const express = require('express');
const  controller  = require('../../controllers/recipes');
const { user: auth } = require('../../middlewares');
const routerRecipe = express.Router();

routerRecipe.get('/', auth, controller.getUserRecipe);

routerRecipe.get('/category/list', auth, controller.getCategories);

routerRecipe.get('/main-page', auth, controller.getMainPage);

routerRecipe.get('/:category', auth, controller.getRecipesByCategory);

routerRecipe.get('/:id', auth, controller.getRecipeById);

module.exports = routerRecipe;
