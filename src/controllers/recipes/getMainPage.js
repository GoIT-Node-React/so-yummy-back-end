const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { CATEGORIES } = require('../../helpers/variables');

const getMainPage = async (_req, res) => {
  const limitNumber = 4;

  let result = {};
  let iterator = Math.floor(Math.random() * (CATEGORIES.length + 1 - limitNumber));

  for (let i = iterator; i < iterator + limitNumber && i < CATEGORIES.length; i++) {
    const recipes = await Recipe.find({ category: CATEGORIES[i] }).select({ title: 1, preview: 1 }).limit(limitNumber);
    result[CATEGORIES[i]] = recipes;
  }

  return res.status(200).json(
    responseData(
      {
        categories: result,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getMainPage);
