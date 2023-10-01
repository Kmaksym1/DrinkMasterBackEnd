const getAllFavorites = async (req, res, next) => {
  try {
    const { favoriteCocktails } = req.user;

    if (!favoriteCocktails) {
      return res.status(404).json({ message: "No favorite cocktails" });
    }
    res.status(200).json({ favoriteCocktails });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllFavorites;
