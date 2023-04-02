const express = require('express');
const router = express.Router();

const { auth: authMiddleware } = require('../../middlewares');
const { popularRecipes: controller } = require('../../controllers');

router.get('/', authMiddleware.auth, controller.getRecipes);

module.exports = router;
