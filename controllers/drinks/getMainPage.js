
const { recipesModel,schema } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");

const getMainPage = async (req, res) => {
    const { page = 1, limit = 9} = req.query;
    const skip = (page - 1) * limit;
    const { birthday } = req.user;

    // Отримуємо вік користувача
    const currentDate = new Date();
    const ageUser = differenceInYears(currentDate,  new Date(birthday));

    const queryConditions = ageUser >= 18 ? { } : { alcoholic: "Non alcoholic" };

    const drinks = await recipesModel.find(queryConditions, "", { skip });
    if (!drinks) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      code: 200,
      message:"Success",
      quantity: drinks.length,
      data: drinks
    });
  }


module.exports = getMainPage;

