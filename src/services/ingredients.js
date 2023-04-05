const Ingredient = require('../models/ingredient');

const getIngredients = async (value) => {
  const searchQuery = {};

  if (value) {
    searchQuery.ttl = { $regex: new RegExp(`^${value}`, 'i') };
  }

  return await Ingredient.find(searchQuery);
};

module.exports = {
  getIngredients,
};
