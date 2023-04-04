const Recipe = require('../../models/recipe');
const { asyncWrapper,responseData } = require('../../helpers/apiHelpers');
const {NotFoundError} = require('../../helpers/errors')

const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const categoryRecipes = await Recipe.find({ category }, " ", {
    skip,
    limit: Number(limit),
  });
  if (!categoryRecipes) {
    throw NotFoundError(404, "Not found");
  }

  res.json(responseData({categoryRecipes}));
};


module.exports = asyncWrapper(getRecipesByCategory);



