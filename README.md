# SO-YUMMY-BACK-END
<div>

## ENDPOINTS:

### 1. Auth

| Method | Endpoint               | Description              |
| ------ |------------------------|--------------------------|
| POST   | `/auth/register`       | User registration        |
| POST   | `/auth/login`          | User login               |
| POST   | `/auth/logout`         | User logout              |
| POST   | `/auth/refresh`        | User refresh             |
| GET    | `/auth/current`        | User current             |
| GET    | `/auth/google`         | User login  ith Google   |


### 2. User
| Method | Endpoint               | Description              |
| ------ |------------------------|--------------------------|
| PATCH  | `/user/`               | Upload a file            |
| PATCH  | `/user/subscribe`      | Subscribe for news       |


### 3. Recipes

| Method | Endpoint                             | Description               |
| ------ |--------------------------------------|-------------------------- |
| GET    | `/recipes/categories`                | Get category list         |
| GET    | `/recipes/main-page`                 | Get main page             |
| GET    | `/recipes/:categories/:categoryName` | Get recipes by category   |
| GET    | `/recipes/:recipeId         `        | Get recipe by id          |


### 4. Search 

| Method | Endpoint               | Description                          |
| ------ |------------------------|--------------------------------------|
| GET    | `/search/`             | Search recipe by title or ingredient |


### 5. Popular recipes 

| Method | Endpoint           | Description        |
| ------ |--------------------|--------------------|
| GET    | `/popularRecipes/` | Get popular recipes|


### 6. Own recipes 

| Method | Endpoint                | Description             |
| ------ |-------------------------| ------------------------|
| GET    | `/ownRecipes/`          | Get own recipe's        |
| POST   |` /ownRecipes/`          | Create recipe           |
| DELETE | `/ownRecipes/:recipeId` | Remove recipe by id     |


### 7. Favorite recipes 

| Method | Endpoint              | Description             |
| ------ |-----------------------| ------------------------|
| GET    | `/favorites/`         | Get favorite recipe's   |
| POST   |` /favorite/`          | Add recipeImage         |
| DELETE | `/favorite/:recipeId` | Remove recipe by id     |

### 8. Shoping list    

| Method | Endpoint                 | Description            |
| ------ |--------------------------| -----------------------|
| GET    | `/shoppingList/`         | Get shopping list      |
| POST   | `/shoppingList/add`      | Add to shopping list   |
| DELETE | `/shoppingList/:id`      | Delete ingredients     |


### 9. Ingredients

| Method | Endpoint         | Description             |
| ------ |------------------| ------------------------| 
| GET    | `/ingredients`   | Get Ingredients list    |
| GET    | `/ingredient `   | Get Ingredient          |


</div>
