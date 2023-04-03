const express = require("express");
const { shoppingList: controller } = require("../../controllers");
const { shoppingList: middleware } = require("../../middlewares");

const shoppingListRouter = express.Router();

shoppingListRouter
  .get("/", controller.getShoppingList)
  .post("/", middleware.addShoppingListItem, controller.addToShoppingList)
  .delete("/:id", controller.removeFromShoppingList);

module.exports = shoppingListRouter;
