const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const { NotFoundError } = require('../../helpers/errors');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findOne({ _id: id });
  if (!recipe) {
    throw new NotFoundError({ message: `recipe with id ${id} not found` });
  }
  return res.status(200).json(
    responseData(
      {
        recipe: recipe,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getRecipeById);
