const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoppingListSchema = new Schema(
  {
    value: {
      type: String,
      required: [true, 'Value is required'],
    },
    ingredient: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ingredient',
      required: [true, 'Ingredient is required'],
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: [true, 'User is required'],
    },
    recipeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'recipe',
      required: [true, 'Recipe id is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const ShoppingListModel = mongoose.model('shopping-list', shoppingListSchema);

module.exports = ShoppingListModel;
