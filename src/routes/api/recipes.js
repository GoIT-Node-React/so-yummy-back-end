const router = require('express').Router();
const auth = require('../../middlewares/auth');
// const {recipes: ctrt } = requires('../../controllers/')


router.get('/', auth, ctrl.getSetOfRecipes)

router.get('/category/list', auth, ctrl.getCategories)

router.get('/popular', auth, ctrl.getPopularRecipes)

router.get('/category/:categoryName', auth, ctrl.getRecipesByCategory)

router.get('/search/:keyWord', auth, ctrl.getRecipesByName)

router.get('/:category/:limit', auth, ctrl.getRecipesByLimit)

router.get('/:id', auth, ctrl.getRecipeById)

module.exports = router;
