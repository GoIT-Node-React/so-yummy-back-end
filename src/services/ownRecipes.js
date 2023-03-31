const cloudinary = require("cloudinary");
const Recipe = require("../models/recipe");

const createRecipe = async (data) => {
  const recipe = await Recipe.create(data);
  return recipe;
};

const deleteRecipe = async (id, owner) => {
  const recipe = await Recipe.findById(id);
  await cloudinary.v2.uploader.destroy(recipe.cloudinaryImageName, "image");
  const result = await Recipe.findOneAndRemove({ _id: id, owner });
  return result;
};

const getRecipes = async (owner, page, limit) => {
  const pipeline = [
    {
      $match: { owner },
    },
    {
      $facet: {
        recipes: [{ $skip: page * limit - limit }, { $limit: limit }],
        count: [{ $count: "total" }],
      },
    },
    {
      $project: {
        recipes: 1,
        total: { $arrayElemAt: ["$count.total", 0] },
        page: { $literal: page },
        limit: { $literal: limit },
      },
    },
  ];

  const results = await Recipe.aggregate(pipeline);
  return results[0];
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipes,
};
