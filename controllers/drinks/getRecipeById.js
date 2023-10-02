const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getRecipeById = async (req, res) => {
    
    const { id } = req.params;

    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      throw HttpError(404, 'Not Found');
    }

    res.status(200).json(recipe);
 
};

module.exports = getRecipeById;