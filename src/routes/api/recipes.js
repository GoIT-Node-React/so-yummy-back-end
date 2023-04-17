const express = require("express");
const controller = require("../../controllers/recipes");
const {
  ownRecipes,
  popularRecipes,
  search,
  favorites,
} = require("../../controllers");
const {
  auth: authMiddleware,
  recipe: middleware,
  search: serachMiddleware,
  favorites: favoritesMiddleware,
  pagination: paginationMiddleware,
  newest: newestMiddleware,
  uploadImage: { recipeImage },
} = require("../../middlewares");
const RequestFieldType = require("../../types/requestFieldType");
const routerRecipe = express.Router();

routerRecipe.use(authMiddleware.auth);

routerRecipe.get(
  "/",
  paginationMiddleware.pagination,
  controller.getAllRecipes
);
routerRecipe.get("/categories", controller.getCategories);
routerRecipe.get("/newest", newestMiddleware.newest, controller.getNewest);
routerRecipe.get(
  "/own",
  paginationMiddleware.pagination,
  ownRecipes.getOwnRecipes
);
routerRecipe.get(
  "/popular",
  paginationMiddleware.pagination,
  popularRecipes.getRecipes
);
routerRecipe.get(
  "/search",
  serachMiddleware.searchRecipe,
  search.getRecipeByTitleOrIngredient
);
routerRecipe.get(
  "/favorites",
  paginationMiddleware.pagination,
  favorites.getFavorite
);
routerRecipe.get(
  "/categories/:categoryName",
  middleware.recipeCategoryName,
  paginationMiddleware.pagination,
  controller.getRecipesByCategory
);
routerRecipe.get("/:recipeId", middleware.recipeId, controller.getRecipeById);

routerRecipe.post(
  "/own",
  recipeImage.single("thumb"),
  middleware.recipe,
  ownRecipes.createRecipe
);
routerRecipe.post(
  "/favorites",
  favoritesMiddleware.recipeId(RequestFieldType.body),
  favorites.addFavorite
);
routerRecipe.delete(
  "/own/:recipeId",
  middleware.recipeId,
  ownRecipes.deleteRecipe
);
routerRecipe.delete(
  "/favorites/:recipeId",
  favoritesMiddleware.recipeId(RequestFieldType.params),
  favorites.deleteFavorite
);

module.exports = routerRecipe;
