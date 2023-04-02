const Recipe = require("../models/recipe");

const getRecipeByTitle = async (type, value, page, limit) => {
  if (type === "title") {
    return await Recipe.find(
      {
        title: {
          $regex: new RegExp(value, "i"),
        },
      },
      { _id: 1, title: 1, thumb: 1, description: 1 }
    )
      .skip(page * limit)
      .limit(limit);
  }

  if (type === "ingredient") {
    return await Recipe.aggregate([
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredients.id",
          foreignField: "_id",
          as: "ingredients",
        },
      },
      { $match: { "ingredients.ttl": { $regex: new RegExp(value, "i") } } },
      { $project: { _id: true, title: true, thumb: true } },
      { $skip: parseInt(page) },
      { $limit: parseInt(limit) },
    ]);
  }
};

module.exports = {
  getRecipeByTitle,
};
