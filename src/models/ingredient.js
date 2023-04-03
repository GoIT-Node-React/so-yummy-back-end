const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredient = new Schema(
  {
    ttl: {
      type: String,
      required: [true, 'Recipe title is required'],
    },
    desc: {
      type: String,
      require: [true, 'Recipe description is required'],
    },
    t: {
      type: String,
      default: '',
    },
    thb: {
      type: String,
      required: [true, 'Set image'],
    },
  },
  { timestamps: true }
);

const Ingredient = mongoose.model('ingredient', ingredient);

module.exports = Ingredient;
