const { favorites: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getFavorite = async (req, res) => {
  const { id } = req.user;

  const recipes = await service.getFavoritesRecipes(id);

  res.status(200).json(responseData({ recipes }, 200));
};
module.exports = asyncWrapper(getFavorite);
