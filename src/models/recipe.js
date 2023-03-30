const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipe = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      default: null,
    },
    instructions: {
      type: String,
      reguired: true,
    },
    description: {
      type: String,
      require: true,
    },
    thumb: {
      type: String,
      required: true,
      /*image*/
    },
    cloudinaryImageName: {
      type: String,
      default: null,
    },
    preview: {
      type: String,
      default: null,
      /*image*/
    },
    time: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      default: null,
    },
    favorites: {
      type: Array,
      default: null,
    },
    likes: {
      type: Array,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    tags: {
      type: Array,
      default: null,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = mongoose.model("recipe", recipe);
module.exports = Recipe;
