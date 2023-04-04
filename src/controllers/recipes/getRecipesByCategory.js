const { recipes: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE, MAX_LIMIT_PER_PAGE } = require('../../helpers/variables');

const getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = req.query;
  const pageLimit = parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  const recipes = await service.getRecipesByCategoryName(categoryName, pageLimit, parseInt(page));

  res.status(200).json(responseData(recipes, 200));
};

module.exports = asyncWrapper(getRecipesByCategory);
