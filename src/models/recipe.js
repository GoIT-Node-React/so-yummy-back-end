const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipe = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    area: {
      type: String,
      default: null,
    },
    instructions: {
      type: String,
      reguired: [true, 'Provide an instructions'],
    },
    description: {
      type: String,
      require: [true, 'Description is required'],
    },
    thumb: {
      type: String,
      required: [true, 'Set image'],
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
      required: [true, 'Set time'],
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
    ingredients: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: 'ingredient',
        },
        measure: {
          type: String,
          required: [true, 'Measure is required'],
        },
        _id: false,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = mongoose.model('recipe', recipe);

module.exports = Recipe;
