const Recipe = require("../models/recipe");

const createRecipe = async (data) => {
  const recipe = await Recipe.create(data);
  return recipe;
};

const deleteRecipe = async (id, owner) => {
  const result = await Recipe.findOneAndRemove({ _id: id, owner });
  return result;
};

const getRecipes = async (owner, page, limit) => {
  return Recipe.find({ owner })
    .select({ __v: 0 })
    .skip(page * limit - limit)
    .limit(limit);
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipes,
};
