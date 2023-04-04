const { shoppingList: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { convertShoppingItemData } = require('../../helpers/convertShoppingItemData');

const addToShoppingList = async (req, res) => {
  const { ingredientId, value } = req.body;
  const { id } = req.user;

  const shoppingItem = await service.add({ ingredient: ingredientId, value, owner: id });

  res.status(201).json(responseData({ shoppingItem: convertShoppingItemData(shoppingItem) }, 201));
};

module.exports = asyncWrapper(addToShoppingList);
