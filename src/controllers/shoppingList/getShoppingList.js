const { shoppingList: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getShoppingList = async (req, res) => {
  const { id } = req.user;
  const shoppingList = await service.getByUserId(id);

  res.status(200).json(responseData({ shoppingList }, 200));
};

module.exports = asyncWrapper(getShoppingList);
