const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

const getRecipe = async (type, value, page, limit) => {
  if (type === "title") {
    return await Recipe.find({
      title: {
        $regex: new RegExp(value, "i"),
      },
    })
      .skip(page)
      .limit(limit);
  }

  if (type === "ingredients") {
    return await Ingredient.find({
      ttl: {
        $regex: new RegExp(value, "i"),
      },
    })
      .skip(page)
      .limit(limit);
  }
};

module.exports = {
  getRecipe,
};
