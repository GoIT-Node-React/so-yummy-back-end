// Return correct user object with needed fields
const convertShoppingItemData = (item) => {
  if (!item) return item;

  const { _id, value, ingredient } = item;

  return { _id, value, ingredient };
};

module.exports = { convertShoppingItemData };
