const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");

const getPopularCocktails = async (req, res) => {
    try {
        const { birthday } = req.user;
      
        const currentDate = new Date();
        const ageUser = differenceInYears(currentDate, birthday);
        let queryConditions = {};

        if (ageUser<=18) {
            queryConditions.alcoholic = "Non alcoholic";
        }

        const popularCocktails = await recipesModel
            .find(queryConditions) // Враховуємо фільтрацію за віком
            .sort({ popular: -1 }) // Сортуємо за кількістю додавань до обраних
            .limit(4);

        res.status(200).json({data: popularCocktails});
    } catch (error) {
        res.status(error.statusCode || 500).json({
            code: error.statusCode || 500,
            message: error.message || 'Внутрішня помилка сервера',
        });
    }
};

module.exports = getPopularCocktails;