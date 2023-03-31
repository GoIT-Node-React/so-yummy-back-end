const Recipe = require('../../models/recipe');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getUserRecipe = async (req, res) => {
  const { id } = req.user;
  const userRecipes = await Recipe.find({ owner: id });
  return res.status(200).json(
    responseData(
      {
        userRecipes: userRecipes,
      },
      200
    )
  );
};

module.exports = {
  getUserRecipe: asyncWrapper(getUserRecipe),
};
