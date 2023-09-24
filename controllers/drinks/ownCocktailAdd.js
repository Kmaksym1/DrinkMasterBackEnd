const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailAdd = async (req, res) => {
    const { adultUser } = req.user;
    if (!req.file || !req.file.path) {
        throw HttpError(400, "Файл обов'язковий для цього запиту");
    }

    const userAge = req.user.age || 0; 

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