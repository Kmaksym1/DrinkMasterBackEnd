const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailAdd = async (req, res) => {
    if (!req.file || !req.file.path) {
        throw HttpError(400, "Файл обов'язковий для цього запиту");
    }

    // Отримати вік користувача з його профілю (якщо він доступний)
    const userAge = req.user.age || 0; // За замовчуванням встановлюємо вік на 0 років, якщо вік не вказаний.

    const cocktailAdd = {
        ...req.body,
        drinkThumb: req.file.path,
        ingredients: JSON.parse(req.body.ingredients),
    };
    console.log(cocktailAdd);

    const { error } = schema.validate(cocktailAdd);

    if (error) {
        res.status(400);
        throw HttpError(400, "Заповни всі поля");
    }

    if (userAge < 18) {
        // Якщо користувачу менше 18 років, ми встановлюємо параметр isAlcoholic в false
        cocktailAdd.isAlcoholic = false;
    }

    const { _id } = req.user;

    const result = await recipesModel.create({ ...cocktailAdd, owner: _id });

    res.status(201).json({
        code: 201,
        message: 'Успішно',
        data: result,
    });
};

module.exports = ownCocktailAdd;