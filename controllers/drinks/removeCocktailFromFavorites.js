const { recipesModel } = require("../../models/recipesModel");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { default: mongoose } = require("mongoose");

const removeCocktailFromFavorites = async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const userId = req.user._id;
    const { favorite } = req.user;

    //чи є коктель в улюблених favorites з даним _id
    const existingCocktail = favorite.find(({ _id }) => _id.equals(reqId));
    
    if (!existingCocktail) {
      throw HttpError(404, "Nothing to delete");
    }

    //зміна методом $pull на серверній частині массив mongoDB і повертає оновлений масив
    const updatedFavoriteArr = await User.findOneAndUpdate(
      userId, // умова пошуку юзера
      { $pull: { favorite: mongoose.Types.ObjectId(reqId) } }, // Оператор $pull для видалення об'єкту з массиву
      { new: true } // Отримуємо оновлене поле favorite з юзера
    );

    const cocktail = await recipesModel.findById(reqId);

    if (!cocktail) {
      throw HttpError(404, "Not found in the cocktail database");
    }

    cocktail.popular = (cocktail.popular || 0) - 1;
    await cocktail.save();

    res.status(200).json({ favorite: updatedFavoriteArr.favorite });
  } catch (error) {
    next(error);
  }
};

module.exports = removeCocktailFromFavorites;
