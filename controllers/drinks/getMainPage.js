// const { recipesModel } = require('../../models/recipesModel');
// const HttpError = require('../../helpers/HttpError');

// const getMainPage = async (req, res) => {
//   const { birthday } = req.user;
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   let queryConditions  = { alcoholic: "Non alcoholic" };
//   if (adultUser) { queryConditions  = {} };
    
// const drinks = await recipesModel.find(queryConditions ,"",{skip,limit});
//   res.status(200).json({
//     code: 200,
//     quantity: drinks.length,
//     data: drinks
//  });
// }

// module.exports = getMainPage;


const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");

const getMainPage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { birthday } = req.user;

    // Отримуємо вік користувача
    const currentDate = new Date();
    const ageUser = differenceInYears(currentDate, birthday);

    // Визначаємо, чи користувач повинен бачити алкогольні коктейлі
    const queryConditions = ageUser >= 18 ? {} : { alcoholic: "Non alcoholic" };

    const drinks = await recipesModel.find(queryConditions, "", { skip, limit });

    res.status(200).json({
      code: 200,
      quantity: drinks.length,
      data: drinks
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      code: error.statusCode || 500,
      message: error.message || 'Внутрішня помилка сервера',
    });
  }
};

module.exports = getMainPage;

