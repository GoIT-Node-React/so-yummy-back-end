const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getAllRecipe = async (_req, res) => {
  const allRecipes = await Recipe.find();

  // limit =10, page=4,

  // limit, page,

  return res.status(200).json(
    responseData(
      {
        // limit: 10,
        // page: 3,
        // total: 285
        recipes: allRecipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getAllRecipe);
