const { recipesModel,schema } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const ownCocktailAdd = async (req, res) => {

    const cocktailAdd = {
        ...req.body,
       // drinkThumb: req.file.path,
//ingredients: JSON.parse(req.body.ingredients),
    };
    console.log(cocktailAdd);

    const { error } = schema.validate(cocktailAdd);

    if (error) {
        res.status(400);
        throw HttpError(400, "Заповни всі поля");
    }

    const result = await recipesModel.create({ ...cocktailAdd});
//owner: _id 
    res.status(201).json({
        code: 201,
        message: 'Успішно',
        data: result,
    });
};

module.exports = ownCocktailAdd;