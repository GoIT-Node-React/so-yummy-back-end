const Recipe = require('../models/recipe');

const getRecipeByTitle = async (value, page, limit) => {
  return await Recipe.aggregate([
    { $match: { title: { $regex: new RegExp(value, 'i') } } },
    {
      $facet: {
        recipes: [{ $skip: parseInt((page - 1) * limit) }, { $limit: parseInt(limit) }],
        count: [{ $count: 'total' }],
      },
    },
    {
      $project: {
        recipes: {
          _id: true,
          title: true,
          thumb: true,
          description: true,
        },
        total: { $arrayElemAt: ['$count.total', 0] },
      },
    },
  ]);
};

const getRecipeByIngredient = async (value, page, limit) => {
  const recipes = await Recipe.aggregate([
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients.id',
        foreignField: '_id',
        as: 'ingredients',
      },
    },
    { $match: { 'ingredients.ttl': { $regex: new RegExp(value, 'i') } } },
    {
      $facet: {
        recipes: [{ $skip: parseInt((page - 1) * limit) }, { $limit: parseInt(limit) }],
        count: [{ $count: 'total' }],
      },
    },
    {
      $project: {
        recipes: {
          _id: true,
          title: true,
          thumb: true,
          description: true,
        },
        total: { $arrayElemAt: ['$count.total', 0] },
      },
    },
  ]);

  return recipes;
};

module.exports = {
  getRecipeByTitle,
  getRecipeByIngredient,
};
