const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredient = new Schema(
  {
    ttl: {
      type: String,
    },
    desc: {
      type: String,
    },
    t: {
      type: String,
    },
    thb: {
      type: String,
      required: [true, "Set image"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Ingredient = mongoose.model("ingredient", ingredient);

module.exports = Ingredient;
