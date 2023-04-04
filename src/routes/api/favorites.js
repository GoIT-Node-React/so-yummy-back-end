const express = require('express');
const { favorites: controller } = require('../../controllers');
const { auth: authMiddleware, favorites } = require('../../middlewares');
const { RequestFieldType } = require('../../types');

const router = express.Router();

router.use(authMiddleware.auth);

router.get('/', controller.getFavorite);
router.post('/', favorites.recipeId(RequestFieldType.body), controller.addFavorite);
router.delete('/:recipeId', favorites.recipeId(RequestFieldType.params), controller.deleteFavorite);

module.exports = router;
