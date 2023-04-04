const { Recipe } = require('../models');

const getFavoritesRecipes = async (userId) => {
  const recipes = await Recipe.find({
    favorites: {
      $in: [userId],
    },
  });

  return recipes;
};

const addRecipeToFavorite = async (recipeId, userId) => {
  const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, { $push: { favorites: userId } }, { new: true });

  return recipe;
};

const deleteRecipeFromFavorites = async (recipeId, userId) => {
  const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, { $pull: { favorites: userId } }, { new: true });

  return recipe;
};

const findFavoriteRecipeByUserId = async (recipeId, userId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,
    favorites: { $in: [userId] },
  });

  return recipe;
};

module.exports = {
  getFavoritesRecipes,
  deleteRecipeFromFavorites,
  addRecipeToFavorite,
  findFavoriteRecipeByUserId,
};
