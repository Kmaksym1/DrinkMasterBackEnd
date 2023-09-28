const { recipesModel } = require("../../models/recipesModel");
const { HttpError } = require("../../helpers");

const addCocktailToFavorites = async (req, res, next) => {
  try {
    const cocktailId = req.body;
    const { favoriteCocktails } = req.user;

    if (
      favoriteCocktails.some((cocktail) => cocktail._id.equals(cocktailId._id))
    ) {
      return res
        .status(400)
        .json({ message: "This cocktail is already in your favorites" });
    }

    const cocktail = await recipesModel.findById(cocktailId);

    if (!cocktail) {
      return res.status(404).json({ message: "Cocktail not found" });
    }

    favoriteCocktails.push(cocktail);
    cocktail.popular = (cocktail.popular || 0) + 1;

    await cocktail.save();
    await req.user.save();

    res.status(200).json(cocktail);
  } catch (error) {
    next(error);
  }
};

module.exports = addCocktailToFavorites;
