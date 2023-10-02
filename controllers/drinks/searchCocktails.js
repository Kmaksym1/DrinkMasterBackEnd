const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require('date-fns');

const searchCocktails = async (req, res) => {
  try {
    const { category, ingredient, searchWord, page = 1, limit = 9 } = req.query;
    const { birthday } = req.user;
    const skip = (page - 1) * limit;

    const currentDate = new Date();
    const ageUser = differenceInYears(currentDate, new Date(birthday));

    const queryConditions = ageUser >= 18 ? {} : { alcoholic: "Non alcoholic" };

    let query = [];

    if (searchWord) {
      query.push({
        $or: [
          { drink: { $regex: searchWord, $options: "i" } },
          { "ingredients.title": { $regex: searchWord, $options: "i" } },
        ],
      });
    }

    if (ingredient) {
      query.push({ "ingredients.title": { $regex: ingredient, $options: "i" } });
    }

    if (category) {
      query.push({ category: { $regex: category, $options: "i" } });
    }

    if (Object.keys(queryConditions).length > 0) {
      query.push(queryConditions);
    }

    const totalHits = await recipesModel.countDocuments({ $and: query });

    const result = await recipesModel.find({ $and: query }, "", { skip, limit }).lean();

    res.json({ page, limit, totalHits, result });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      code: error.statusCode || 500,
      message: error.message || 'Внутрішня помилка сервера',
    });
  }
};

module.exports = searchCocktails;

