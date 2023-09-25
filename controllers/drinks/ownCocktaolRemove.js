const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailRemove = async(req,res)=> {
    try {
        const { _id } = req.user;

        const recipes = await recipesModel.find({ owner: _id });

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

module.exports = ownCocktailRemove;