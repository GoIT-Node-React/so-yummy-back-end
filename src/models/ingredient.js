const { Schema, model, SchemaTypes } = require("mongoose");

const ingredientSchema = new Schema(
  {
    ttl: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ingredient = model("Ingredient", ingredientSchema);
module.exports = Ingredient;
