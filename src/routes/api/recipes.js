const express = require('express');
const  controller  = require('../../controllers/recipes');
const { user: auth } = require('../../middlewares');
const router = express.Router();

router.get('/', auth, controller.getCategories);

router.get('/category/list', auth, controller.getCategories);

router.get('/main-page', auth, controller.getMainPage);

router.get('/:category', auth, controller.getRecipesByCategory);

router.get('/:id', auth, controller.getRecipeById);

module.exports = router;
