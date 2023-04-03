const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shoppingListSchema = new Schema(
  {
    value: {
      type: String,
      required: [true, "number is required"],
    },
    ingredient: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
