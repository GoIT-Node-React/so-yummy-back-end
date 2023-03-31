const express = require('express');
const  controller  = require('../../controllers/recipes');
const { user: auth } = require('../../middlewares');
const routerRecip = express.Router();

routerRecip.get('/', auth, controller.getUserRecipe);

routerRecip.get('/category/list', auth, controller.getCategories);

routerRecip.get('/main-page', auth, controller.getMainPage);

routerRecip.get('/:category', auth, controller.getRecipesByCategory);

routerRecip.get('/:id', auth, controller.getRecipeById);

module.exports = routerRecip;
