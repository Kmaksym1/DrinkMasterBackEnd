const { recipesModel,schema } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");

const ownCocktailAdd = async (req, res) => {
    // const { birthday } = req.user;

    // // Отримуємо вік користувача
    // const currentDate = new Date();
    // const ageUser = differenceInYears(currentDate,  new Date(birthday));

    // const isAlcoholic = ageUser >= 18;
    const cocktailAdd = {
        ...req.body,
       // drinkThumb: req.file.path,
//ingredients: JSON.parse(req.body.ingredients),
    };
    console.log(cocktailAdd);

    const { error } = schema.validate(cocktailAdd);

    if (error) {
        res.status(400);
        throw HttpError(400, "Enter all fields");
    }
   // const { _id } = req.user;
    const result = await recipesModel.create({ ...cocktailAdd });
//, owner: _id
    res.status(201).json({
        code: 201,
        message: 'Success',
        data: result,
    });
};

module.exports = ownCocktailAdd;