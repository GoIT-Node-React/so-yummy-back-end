const { shoppingList: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { NotFoundError } = require('../../helpers/errors');
const { convertShoppingItemData } = require('../../helpers/convertShoppingItemData');

const removeFromShoppingList = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const shoppingItem = await service.removeById(id, userId);

  if (!shoppingItem) {
    throw new NotFoundError('Deleted item not found');
  }

  res.status(200).json(responseData({ shoppingItem: convertShoppingItemData(shoppingItem) }, 200));
};

module.exports = asyncWrapper(removeFromShoppingList);
