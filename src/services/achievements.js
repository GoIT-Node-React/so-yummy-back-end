const { User } = require('../models');

const achievements = async (id) => {
  const result = await User.aggregate([
    {
      $match: { _id: id },
    },
    {
      $lookup: {
        from: 'recipes',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$favorites', '$$userId'] },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
        as: 'favoriteRecipes',
      },
    },
    {
      $lookup: {
        from: 'shoppinglists',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$userId', '$$userId'] },
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
        as: 'shoppingLists',
      },
    },
    {
      $project: {
        daysSinceCreated: {
          $floor: {
            $divide: [{ $subtract: [new Date(), '$createdAt'] }, 1000 * 60 * 60 * 24],
          },
        },
        favoriteRecipesCount: {
          $ifNull: [{ $first: '$favoriteRecipes.count' }, 0],
        },
        shoppingListsCount: {
          $ifNull: [{ $first: '$shoppingLists.count' }, 0],
        },
      },
    },
  ]);
  return result[0];
};

module.exports = {
  achievements,
};
