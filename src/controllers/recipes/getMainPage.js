const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getMainPage = async (req, res) => {
  const limitNumber = 4;
  const category = [
    'Beef',
    'Breakfast',
    'Chicken',
    'Dessert',
    'Goat',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
    'Vegan',
    'Vegeterian',
  ];
  let result = {};
  let iterator = Math.floor(
    Math.random() * (category.length + 1 - limitNumber)
  );
  for (
    let i = iterator;
    i < iterator + limitNumber && i < category.length;
    i++
  ) {
    const recipes = await Recipe.find({ category: category[i] })
      .select({ title: 1, preview: 1 })
      .limit(limitNumber);
    result[category[i]] = recipes;
  }
  return res.status(200).json(
    responseData(
      {
        result: result,
      },
      200
    )
  );
};

module.exports = {
  getMainPage: asyncWrapper(getMainPage),
};
