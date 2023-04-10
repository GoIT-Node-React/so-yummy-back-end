const { favorites: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { MAX_LIMIT_PER_PAGE, DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } = require('../../helpers/variables');

const getFavorite = async (req, res) => {
  const { id } = req.user;
  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.getFavoritesRecipes(id, parseInt(page), limit);

  res.status(200).json(responseData({ ...recipes }, 200));
};
module.exports = asyncWrapper(getFavorite);
