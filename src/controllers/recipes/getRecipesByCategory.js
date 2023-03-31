const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getRecipesByCategory = async (req, res) => {
  const limitNumber = 8;
  const { category } = req.params;
  const recipes = await Recipe.find({ category })
    .select({ title: 1, preview: 1 })
    .limit(limitNumber);
  return res.status(200).json(
    responseData(
      {
        recipes: recipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getRecipesByCategory);
