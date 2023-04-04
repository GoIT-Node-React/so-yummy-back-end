const { favorites: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { DatabaseError } = require('../../helpers/errors');

const addFavorite = async (req, res) => {
  const { recipeId } = req.body;
  const { id } = req.user;

  const favoriteRecipe = await service.findFavoriteRecipeByUserId(recipeId, id);

  if (favoriteRecipe) {
    throw new DatabaseError(`Recipe "${recipeId}" already in favorites`);
  }

  const recipe = await service.addRecipeToFavorite(recipeId, id);

  res.status(200).json(responseData({ recipe }, 200));
};

module.exports = asyncWrapper(addFavorite);
