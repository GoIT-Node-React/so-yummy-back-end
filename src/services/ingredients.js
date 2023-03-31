const Ingredient = require("../models/ingredient");

const getIngredients = async (value) => {
  const ingredients = await Ingredient.find();
  return ingredients.filter((elem) => elem.ttl.includes(value));
};

module.exports = {
  getIngredients,
};
