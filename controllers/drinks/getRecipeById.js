const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getRecipeById = async (req, res) => {
  try {
    const { adultUser } = req.user;
    const { id } = req.params;

    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      throw new HttpError(404, 'Not Found');
    }

    if (recipe.alcoholic === 'Alcoholic' && !adultUser) {
      throw new HttpError(400, 'Тільки для дорослих!');
    }

    res.status(200).json({
      code: 200,
      message: 'Успішна операція',
      data: recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Помилка на сервері' });
  }
};

module.exports = getRecipeById;