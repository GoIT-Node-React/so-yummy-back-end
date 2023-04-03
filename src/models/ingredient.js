const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema(
  {
    ttl: {
      type: String,
      required: [true, "number is required"],
    },
    desc: {
      type: String,
      required: [true, "number is required"],
    },
    t: {
      type: String,
      required: [true, "number is required"],
    },
    thb: {
      type: String,
      required: [true, "number is required"],
    },
  
  },
  { versionKey: false, timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
