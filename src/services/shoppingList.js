const { ShoppingList } = require('../models');

const getByUserId = async (id) => {
  const shoppingList = await ShoppingList.find({ owner: id })
    .populate('ingredient', 'thb ttl')
    .select({ _id: 1, value: 1, ingredient: 1 });

  return shoppingList;
};

const add = async (data) => {
  const item = new ShoppingList(data);
  await item.save();

  return item;
};

const removeById = async (id, owner) => {
  const item = await ShoppingList.findOneAndRemove({ _id: id, owner });

  return item;
};

module.exports = {
  getByUserId,
  add,
  removeById,
};
