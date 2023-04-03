const ShoppingList = require("../models/shopping-list ");
const { Ingredient } = require("../models");
const { asyncWrapper } = require("../helpers/apiHelpers");

const addToShoppingList = async (req, res) => {

  const { ingredientId, value } = req.body;
  const ingredient = await Ingredient.findById(ingredientId);
  const shoppingListItem = new ShoppingList({
    ingredient: ingredient._id,
    value: value,
  });
  await shoppingListItem.save();
  res.status(200).json({
    message: "Ingredient added to shopping list",
  });
};

const getShoppingList = async (req, res) => {
  const shoppingList = await ShoppingList.find().populate(
    "ingredient",
    "thb ttl"
  );
 res.status(200).json({
   shoppingList,
 });
};

const removeFromShoppingList = async (req, res) => {
  const { id } = req.params;
  await ShoppingList.findByIdAndRemove(id);
  res.status(200).json({
    message: "Ingredient has been removed",
  });
};

module.exports = {
  addToShoppingList: asyncWrapper(addToShoppingList),
  getShoppingList: asyncWrapper(getShoppingList),
  removeFromShoppingList: asyncWrapper(removeFromShoppingList),
};
