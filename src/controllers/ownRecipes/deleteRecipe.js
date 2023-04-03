const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { NotFoundError } = require('../../helpers/errors');
const { ownRecipes: service } = require('../../services');

const deleteRecipe = async (req, res) => {
  const { id: owner } = req.user;
  const { recipeId } = req.params;

  const result = await service.deleteById(recipeId, owner);

  if (!result) {
    throw new NotFoundError('Recipe with this id not found');
  }

  res.status(200).json(
    responseData(
      {
        recipe: result,
      },
      200
    )
  );
};

module.exports = asyncWrapper(deleteRecipe);
