const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const getPopularCocktails = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const { adultUser } = req.user;

        let queryConditions = {};

        if (!adultUser) {
            queryConditions.alcoholic = "Non alcoholic";
        }

        const popularCocktails = await recipesModel
            .find(queryConditions) // Враховуємо фільтрацію за віком
            .sort({ favoritesCount: -1 }) // Сортуємо за кількістю додавань до обраних
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            code: 200,
            quantity: popularCocktails.length,
            data: popularCocktails,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            code: error.statusCode || 500,
            message: error.message || 'Внутрішня помилка сервера',
        });
    }
};

module.exports = getPopularCocktails;