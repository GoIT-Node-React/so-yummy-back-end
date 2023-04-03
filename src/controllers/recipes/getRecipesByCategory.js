const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getRecipesByCategory = async (req, res) => {
  // const {limit, page} = req.query;
  const limitNumber = 8;
  const { category } = req.params;
  const recipes = await Recipe.find({ category }).select({ title: 1, preview: 1 }).limit(limitNumber); //.skip(limit * (page - 1));

  // limit = 10, page=4,

  // limit, page,

  return res.status(200).json(
    responseData(
      {
        // limit: 45,
        // page: 1,
        // total: 285
        recipes: recipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getRecipesByCategory);
