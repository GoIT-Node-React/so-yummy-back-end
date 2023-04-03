const express = require('express');
const { shoppingList: controller } = require('../../controllers');
const { shoppingList: middleware, auth: authMiddleware } = require('../../middlewares');

const shoppingListRouter = express.Router();

shoppingListRouter.use(authMiddleware.auth);
shoppingListRouter
  .get('/', controller.get)
  .post('/', middleware.add, controller.add)
  .delete('/:id', middleware.delete, controller.delete);

module.exports = shoppingListRouter;
