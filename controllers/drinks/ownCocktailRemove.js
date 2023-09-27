const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailRemove = async(req,res)=> {
    try {
        const { _id } = req.user;
         const { cocktailId } = req.params; // Припустимо, що ідентифікатор коктелю передається через параметр URL
       // Перевірка, чи існує коктель з вказаним ідентифікатором та чи належить він користувачеві
        const cocktail = await recipesModel.findOne({ _id: cocktailId, owner: _id });

        if (!cocktail) {
            throw new HttpError(404, "Коктель не знайдено або не належить користувачеві");
        }

        // Видалення коктелю
        await cocktail.remove();

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

module.exports = ownCocktailRemove;