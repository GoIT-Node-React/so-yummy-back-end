const express = require('express');
const { favorites: controller } = require('../../controllers');
const { auth: authMiddleware } = require('../../middlewares');

const router = express.Router();

router.use(authMiddleware.auth);

router.post('/', controller.addFavorite);
router.get('/', controller.getFavorite);
router.delete('/:id', controller.deleteFavorite);

module.exports = router;
