const Ingredient = require("../models/ingredient");
const { asyncWrapper} = require("../helpers/apiHelpers");


const getIngredient = async (req, res) => {
  const ingredients = await Ingredient.find();
  res.send(ingredients);
};

module.exports = {
  getIngredient: asyncWrapper(getIngredient),
};