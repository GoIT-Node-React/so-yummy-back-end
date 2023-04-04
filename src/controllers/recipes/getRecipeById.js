const { recipes: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { NotFoundError } = require('../../helpers/errors');

const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await service.getRecipeById(recipeId);

  if (!recipe) {
    throw new NotFoundError(`Recipe with id "${recipeId}" not found`);
  }

  return res.status(200).json(responseData({ recipe }, 200));
};

module.exports = asyncWrapper(getRecipeById);
