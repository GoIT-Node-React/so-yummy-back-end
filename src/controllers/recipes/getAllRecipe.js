const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getAllRecipe = async (req, res) => {
  // const { id } = req.user;
  const allRecipes = await Recipe.find();
  return res.status(200).json(
    responseData(
      {
        allRecipes: allRecipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getAllRecipe);
