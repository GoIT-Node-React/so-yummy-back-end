const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getRecipesByCategory = async (req, res) => {
  const {limit, page,} = req.query;
  const { category} = req.params;
  const skip = (page - 1) * limit;

  const sort = { name: 1 }; // sort by name in ascending order

  const filter = category ? { category } : {}; // filter by category if provided
  
  const recipes = Recipe.find(filter).sort(sort).skip(skip).limit(limit);

  return res.status(200).json(
    responseData(
      {
        recipes: recipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getRecipesByCategory);


// pagination for Recipe page = 1, limit = 10, categories  for MongoDB