const express = require('express');
const  controller  = require('../../controllers/recipes');
const { user: auth } = require('../../middlewares');
const recipeRouter = express.Router();

recipeRouter.get('/', auth, controller.getCategories);

recipeRouter.get('/category/list', auth, controller.getCategories);

recipeRouter.get('/main-page', auth, controller.getMainPage);

recipeRouter.get('/:category', auth, controller.getRecipesByCategory);

recipeRouter.get('/:id', auth, controller.getRecipeById);

module.exports = recipeRouter;
