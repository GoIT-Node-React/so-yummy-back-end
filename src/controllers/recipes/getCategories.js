const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getCategories = async (req, res) => {
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
  return res.status(200).json(
    responseData(
      {
        category: category,
      },
      200
    )
  );
};

module.exports =  asyncWrapper(getCategories);
