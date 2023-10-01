const { recipesModel,schema } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");
const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");

// const ownCocktailAdd = async (req, res) => {
//     const {_id } = req.user;
//     const { birthday } = req.user;
//     const { ingredients } = req.body;
//     // // Отримуємо вік користувача
//     const currentDate = new Date();
//     const ageUser = differenceInYears(currentDate,  new Date(birthday));
// // if (!req.file) {
// //   res.status(400).json({ message: 'No file uploaded' });
// //   return;
// //     }
  
//     //const isAlcoholic = ageUser >= 18;
//     const cocktailAdd = {
//         ...req.body,
//     // drinkThumb: req.file.path,
//      // ingredients: JSON.parse(req.body.ingredients),
//     };
//     console.log(cocktailAdd);

//     const { error } = schema.validate(cocktailAdd);

//     if (error) {
//         res.status(400);
//         throw HttpError(400, "Enter all fields");
//     }

//     const result = await recipesModel.create({ ...cocktailAdd, owner:_id});

//     res.status(201).json({
//         code: 201,
//         message: 'Success',
//         data: result,
//     });
// };



const ownCocktailAdd = async (req, res) => {
  const { _id: owner } = req.user;
  if (!req.file) {
    const newRecipe = await Recipe.create({ ...req.body, drinkThumb: null, owner });
    return req.json(newRecipe);
  }

  const { path: tempUpload, originalname } = req.file;

  try {
    const fileName = `${owner}_${originalname}`;

    const { url: drinkThumb } = await cloudinary.uploader.upload(tempUpload, {
      folder: "recipes",
      public_id: fileName,
      quality: 60,
      crop: "fill",
    });

    const cocktailAdd = await recipesModel.create({
      ...req.body,
      drinkThumb,
      owner,
    });

    await fs.unlink(tempUpload);

    res.status(201).json(cocktailAdd);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};



module.exports = ownCocktailAdd;