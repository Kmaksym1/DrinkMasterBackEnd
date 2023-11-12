const { recipesModel, schema } = require("../../models/recipesModel");
const HttpError = require("../../helpers/HttpError");
const { differenceInYears } = require("date-fns");

const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");

const ownCocktailAdd = async (req, res) => {
  const { _id } = req.user;
  const { birthday } = req.user;
  const drinkThumb = req.file.path;
  const { ingredients } = req.body;

  let parsedIngredients = JSON.parse(ingredients);
  const currentDate = new Date();
  const ageUser = differenceInYears(currentDate, new Date(birthday));

  const queryConditions = ageUser >= 18 ? {} : { alcoholic: "Non alcoholic" };

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  //let parsedIngredients = [];
  if (typeof ingredients === "string") {
    try {
      parsedIngredients = JSON.parse(ingredients);
    } catch (error) {
      return res.status(400).json({ error: "Invalid ingredients format" });
    }
  } else if (Array.isArray(ingredients)) {
    parsedIngredients = ingredients;
  }

  const cocktailAdd = {
    ...req.body,
    drinkThumb,
    ingredients: parsedIngredients,
    ...queryConditions, // Додано умови до коктейлю
  };

  const { error } = recipesModel.validate(cocktailAdd);

  if (error) {
    return res.status(400).json({ error: "Enter all fields" });
  }

  const result = await recipesModel.create({ ...cocktailAdd, owner: _id });

  return res.status(201).json({
    code: 201,
    data: result,
  });
};

module.exports = ownCocktailAdd;
