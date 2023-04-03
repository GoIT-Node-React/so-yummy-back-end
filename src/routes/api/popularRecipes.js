const express = require('express');
const router = express.Router();
const { auth: authMiddleware, pagination: middleware } = require('../../middlewares');
const { popularRecipes: controller } = require('../../controllers');

router.get('/', authMiddleware.auth, middleware.pagination, controller.getRecipes);

module.exports = router;
