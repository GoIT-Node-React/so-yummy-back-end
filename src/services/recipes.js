const mongoose = require("mongoose");
const { Recipe } = require("../models");

// Get recipes with pagination
const getRecipes = async (limit, page) => {
  const recipes = await Recipe.aggregate([
    {
      $facet: {
        recipes: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: "total",
          },
        ],
      },
    },
    {
      $project: {
        recipes: {
          _id: 1,
          title: 1,
          category: 1,
          description: 1,
          thumb: 1,
          preview: 1,
          time: 1,
        },
        total: {
          $arrayElemAt: ["$count.total", 0],
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

  return recipes[0];
};

// Get recipe by id
const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(recipeId),
      },
    },
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingr_info",
      },
    },
    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingr_info",
                    {
                      $indexOfArray: ["$ingr_info._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["ingr_info", "ingredients.id"],
    },
  ]);

  return recipe[0];
};

// Get recipe by id
const getRecipesByCategoryName = async (categoryName, limit, page) => {
  const recipe = await Recipe.aggregate([
    {
      $match: {
        category: new RegExp(categoryName, "i"),
      },
    },
    {
      $facet: {
        recipes: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: "total",
          },
        ],
      },
    },
    {
      $project: {
        recipes: {
          _id: 1,
          title: 1,
          category: 1,
          description: 1,
          thumb: 1,
          preview: 1,
        },
        total: {
          $arrayElemAt: ["$count.total", 0],
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

  return recipe[0];
};

const getRecipesByCategories = async (categories) => {
  const pipeline = [
    {
      $sort: {
        updatedAt: -1,
      },
    },
    {
      $limit: 4,
    },
    {
      $project: {
        title: 1,
        category: 1,
        description: 1,
        thumb: 1,
        preview: 1,
      },
    },
  ];

  const pipelineByCategories = Object.fromEntries(
    categories.map((category) => [
      category,
      [
        {
          $match: {
            category: {
              $regex: new RegExp(category, "i"),
            },
          },
        },
        ...pipeline,
      ],
    ])
  );

  const result = await Recipe.aggregate([
    {
      $facet: pipelineByCategories,
    },
  ]);

  return result[0];
};
module.exports = {
  getRecipes,
  getRecipeById,
  getRecipesByCategoryName,
  getRecipesByCategories,
};
