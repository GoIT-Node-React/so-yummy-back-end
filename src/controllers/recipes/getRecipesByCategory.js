const Recipe = require('../../models/recipe');
const { asyncWrapper, } = require('../../helpers/apiHelpers');


const getRecipesByCategory = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * PAGE_SIZE;
  
  Recipe.find({})
    .sort({ created_date: -1 })
    .skip(skip)
    .limit(PAGE_SIZE)
    .exec((err, recipes) => {
      Recipe.countDocuments().exec(( count) => {        
          const totalPages = Math.ceil(count / PAGE_SIZE);
          res.render("recipes", {
            recipes,
            totalPages,
            currentPage: page,
            pages: Array.from({ length: totalPages }, (_, i) => i + 1),
          })      
            
      });  
    })
  };


module.exports = asyncWrapper(getRecipesByCategory);



