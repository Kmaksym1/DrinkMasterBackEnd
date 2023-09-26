const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');
//const { differenceInYears } = require("date-fns");

const getRecipeById = async (req, res) => {

    // const { birthday } = req.user;

    // // Отримуємо вік користувача
    // const currentDate = new Date();
    // const ageUser = differenceInYears(currentDate,  new Date(birthday));
    // const queryConditions = ageUser >= 18 ? { } : { alcoholic: "Non alcoholic" };
    const { id } = req.params;

    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      throw new HttpError(404, 'Not Found');
    }

    res.status(200).json(recipe);
 
};

module.exports = getRecipeById;