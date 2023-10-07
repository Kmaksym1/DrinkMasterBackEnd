const { recipesModel } = require("../../models/recipesModel");
const { HttpError } = require("../../helpers");

const addCocktailToFavorites = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { favorite } = req.user;

    if (favorite.some((cocktail) => cocktail._id.equals(id))) {
      throw HttpError(409, "This cocktail is already in your favorites");
    }

    const cocktail = await recipesModel.findById(id);

    if (!cocktail) {
      throw HttpError(404, "Cocktail not found");
    }

    favorite.push(cocktail._id);
    cocktail.popular = (cocktail.popular || 0) + 1;

    await cocktail.save();
    await req.user.save();

    res
      .status(200)
      .json({ message: "Сocktail added successfully", id: cocktail._id });
  } catch (error) {
    next(error);
  }
};

module.exports = addCocktailToFavorites;
