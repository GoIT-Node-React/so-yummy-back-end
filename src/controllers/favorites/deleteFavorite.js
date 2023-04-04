const { asyncWrapper } = require("../../helpers/apiHelpers");
const { NotFoundError } = require("../../helpers/errors");
const UserModel = require("../../models/user");

const deleteFavorite = async (req, res) => {
  const { _id } = req.user;
  const { recipeId } = req.body;

  const result = await UserModel.findOneAndDelete(recipeId, _id);

  if (!result) {
    throw new NotFoundError("Recipe with this id not found");
  }
  res.json({ message: "Recipe deleted from Favorites" });
};

module.exports = asyncWrapper(deleteFavorite);
