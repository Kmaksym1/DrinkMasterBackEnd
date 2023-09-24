const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');


const getOwnCocktails = async (req, res) => {
    try {
        // Отримуємо ідентифікатор користувача з об'єкта запиту
        const { _id } = req.user;
        const { adultUser } = req.user;

        // Знаходимо рецепти, що належать цьому користувачу
        const recipes = await recipesModel.find({ owner: _id });

        // Якщо рецепти не знайдені, викидаємо помилку 404
        if (!recipes || recipes.length === 0) {
            throw new HttpError(404, "Користувач ще не створив жодних рецептів");
        }

        res.status(200).json({
            code: 200,
            message: 'Успішна операція',
            data: recipes,
        });
    } catch (error) {
       
        res.status(error.statusCode || 500).json({
            code: error.statusCode || 500,
            message: error.message || 'Внутрішня помилка сервера',
        });
    }
}

module.exports = getOwnCocktails;