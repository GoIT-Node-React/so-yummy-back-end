const { Recipe } = require('../models');

const getFavoritesRecipes = async (userId, page, limit) => {
  const pipeline = [
    {
      $match: {
        favorites: {
          $in: [userId],
        },
      },
    },
    {
      $facet: {
        recipes: [{ $skip: page * limit - limit }, { $limit: limit }],
        count: [{ $count: 'total' }],
      },
    },
    {
      $project: {
        recipes: 1,
        total: { $arrayElemAt: ['$count.total', 0] },
        page: { $literal: page },
        limit: { $literal: limit },
      },
    },
  ];

  const results = await Recipe.aggregate(pipeline);
  return results[0];
};

const addRecipeToFavorite = async (recipeId, userId) => {
  const recipe = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $push: { favorites: userId } },
    { new: true }
  ).select({ title: 1, category: 1, description: 1, thumb: 1, preview: 1, time: 1 });
  // const recipe = await Recipe.findOneAndUpdate({ _id: recipeId }, { $addToSet: { favorites: userId } }, { new: true });

  return recipe;
};

const deleteRecipeFromFavorites = async (recipeId, userId) => {
  const recipe = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $pull: { favorites: userId } },
    { new: true }
  ).select({ title: 1, category: 1, description: 1, thumb: 1, preview: 1, time: 1 });

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
