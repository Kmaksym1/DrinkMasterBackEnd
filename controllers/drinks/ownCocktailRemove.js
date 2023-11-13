const { recipesModel } = require("../../models/recipesModel");
const HttpError = require("../../helpers/HttpError");

const ownCocktailRemove = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params; // Припустимо, що ідентифікатор коктелю передається через параметр URL
  // Перевірка, чи існує коктель з вказаним ідентифікатором та чи належить він користувачеві
  const deletedCocktail = await recipesModel.find({ _id: id });

  if (!deletedCocktail) {
    throw new HttpError(404, "Not Found");
  }

  await recipesModel.remove({ _id: id }, { new: true });

  const ownerCocktails = await recipesModel.find({ owner: _id });

  return res.json({ data: ownerCocktails });
};

module.exports = ownCocktailRemove;
