const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');



const getAllRecipes = async (req, res) => {
let {limit = 10, page = 1} = req.query;

const recipes = await Recipe.find().limit(limit).skip((page - 1) * limit)

  return res.status(200).json(responseData({
    recipes: recipes,
    page,
    limit
  }, 200));
};


module.exports = asyncWrapper(getAllRecipes);

