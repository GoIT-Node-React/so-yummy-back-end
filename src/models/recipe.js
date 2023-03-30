const { Schema, model, SchemaTypes } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);
module.exports = Recipe;
