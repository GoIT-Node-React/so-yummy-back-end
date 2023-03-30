const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

const getRecipe = async (type, value) => {
  if (type === "title") {
    const recipes = await Recipe.find();
    return recipes.filter((elem) => elem.title.includes(value));
  }

  if (type === "ingredients") {
    const recipes = await Ingredient.find();
    return recipes.filter((elem) => elem.ttl.includes(value));
  }
};

module.exports = {
  getRecipe,
};
