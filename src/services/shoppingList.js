const { ShoppingList } = require('../models');

const getAll = async (id) => {
  const shoppingList = await ShoppingList.aggregate([
    {
      $match: {
        owner: id,
      },
    },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredient',
        foreignField: '_id',
        as: 'ingredient',
      },
    },
    {
      $set: {
        ingredient: {
          $arrayElemAt: ['$ingredient', 0],
        },
      },
    },
    {
      $facet: {
        shoppingList: [],
        count: [
          {
            $count: 'total',
          },
        ],
      },
    },
    {
      $project: {
        shoppingList: {
          _id: 1,
          value: 1,
          ingredient: {
            _id: 1,
            ttl: 1,
            thb: 1,
          },
          recipeId: 1,
        },
      },
    },
  ]);

  return shoppingList[0];
};

const getByUserId = async (id, limit, page) => {
  const shoppingList = await ShoppingList.aggregate([
    {
      $match: {
        owner: id,
      },
    },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredient',
        foreignField: '_id',
        as: 'ingredient',
      },
    },
    {
      $set: {
        ingredient: {
          $arrayElemAt: ['$ingredient', 0],
        },
      },
    },
    {
      $facet: {
        shoppingList: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: 'total',
          },
        ],
      },
    },
    {
      $project: {
        shoppingList: {
          _id: 1,
          value: 1,
          ingredient: {
            _id: 1,
            ttl: 1,
            thb: 1,
          },
          recipeId: 1,
        },
        total: {
          $arrayElemAt: ['$count.total', 0],
        },
        page: {
          $literal: page,
        },
        limit: {
          $literal: limit,
        },
      },
    },
  ]);

  return shoppingList[0];
};

const add = async (data) => {
  const item = new ShoppingList(data);
  await item.save();

  return item.populate('ingredient', '_id ttl thb');
};

const removeById = async (id, owner) => {
  const item = await ShoppingList.findOneAndRemove({ _id: id, owner }).populate('ingredient', '_d ttl thb');

  return item;
};

module.exports = {
  getAll,
  getByUserId,
  add,
  removeById,
};
