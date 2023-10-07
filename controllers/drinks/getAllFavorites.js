const { User } = require("../../models/user");

const getAllFavorites = async (req, res, next) => {
  try {
    const { favorite, _id } = req.user;

    if (!favorite || favorite.length === 0) {
      return res
        .status(200)
        .json({ message: "No favorite cocktails", favorite });
    }

    const userWithFavorites = await User.findById(_id).populate("favorite");

    res.status(200).json({ favorite: userWithFavorites.favorite });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllFavorites;
