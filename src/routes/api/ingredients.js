const express = require('express');
const router = express.Router();

const { auth: authMiddleware, ingredients: middleware } = require('../../middlewares');
const { ingredients: controller } = require('../../controllers');

router.use(authMiddleware.auth);
router.get('/', middleware.getIngredients, controller.getIngredients);

module.exports = router;
