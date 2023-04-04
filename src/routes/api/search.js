const express = require('express');
const router = express.Router();

const { auth: authMiddleware, search: middleware } = require('../../middlewares');
const { search: controller } = require('../../controllers');

router.get('/', authMiddleware.auth, middleware.searchRecipe, controller.getRecipeByTitleOrIngredient);

module.exports = router;
