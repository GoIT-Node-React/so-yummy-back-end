const { favorites: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { NotFoundError } = require('../../helpers/errors');

const deleteFavorite = async (req, res) => {
  const { id } = req.user;
  const { recipeId } = req.params;

  const favoriteRecipe = await service.findFavoriteRecipeByUserId(recipeId, id);

  if (!favoriteRecipe) {
    throw new NotFoundError(`Favorite recipe with id "${recipeId}" not found`);
  }

  const recipe = await service.deleteRecipeFromFavorites(recipeId, id);

  res.json(responseData({ recipe }, 200));
};

module.exports = asyncWrapper(deleteFavorite);
