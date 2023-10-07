const { recipesModel } = require("../../models/recipesModel");
const HttpError = require("../../helpers/HttpError");
const { differenceInYears } = require("date-fns");

const getOwnCocktails = async (req, res) => {
  try {
    // Отримуємо ідентифікатор користувача з об'єкта запиту
    const { _id } = req.user;
    const { birthday } = req.user;
    const currentDate = new Date();
    const ageUser = differenceInYears(currentDate, birthday);

    // Визначаємо, чи користувач повинен бачити алкогольні коктейлі
    const queryConditions = ageUser >= 18 ? {} : { alcoholic: "Non alcoholic" };
    // Знаходимо рецепти, що належать цьому користувачу
    const recipes = await recipesModel.find(
      { owner: _id },
      { drink: 1, alcoholic: 1, description: 1, drinkThumb: 1 }
    );

    // Якщо рецепти не знайдені, викидаємо помилку 404
    if (!recipes) {
      throw new HttpError(404, "Користувач ще не створив жодних рецептів");
    }

    res.status(200).json({
      code: 200,
      message: "Успішна операція",
      data: recipes,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      code: error.statusCode || 500,
      message: error.message || "Внутрішня помилка сервера",
    });
  }
};

module.exports = getOwnCocktails;
