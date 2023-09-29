const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailRemove = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params; // Припустимо, що ідентифікатор коктелю передається через параметр URL
    // Перевірка, чи існує коктель з вказаним ідентифікатором та чи належить він користувачеві
    const deletedCocktail = await recipesModel.findOne(id);

    if (!deletedCocktail) {
        throw new HttpError(404, "Not Found");
    }

    if (JSON.stringify(deletedCocktail.owner) === JSON.stringify( id )) {
        await deletedCocktail.deleteOne();
    } else {
        throw HttpError(403);
    }
    res.json({ deletedCocktail });
}


module.exports = ownCocktailRemove;