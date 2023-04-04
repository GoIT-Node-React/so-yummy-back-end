const { asyncWrapper } = require("../../helpers/apiHelpers");
const UserModel = require("../../models/user");

const addFavorite = async (req, res) => {
  const { recipeId } = req.body;
  const { _id } = req.user;
  const result = await UserModel.findByIdAndUpdate(
    _id,
    { $push: { fovorites: recipeId } },
    { new: true }
  );
  console.log(result);
  res.status(200).json({ massage: "Recipe added to favorite" });
};

module.exports = asyncWrapper(addFavorite);
