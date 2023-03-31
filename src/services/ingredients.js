const Ingredient = require("../models/ingredient");

const getIngredients = async (value) => {
  if (value) {
    return await Ingredient.find({
      ttl: {
        $regex: new RegExp(value, "i"),
      },
    });
  }

  return await Ingredient.find();
};

module.exports = {
  getIngredients,
};
