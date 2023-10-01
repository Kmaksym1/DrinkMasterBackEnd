const { recipesModel,schema } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');
const { differenceInYears } = require("date-fns");
const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");

const ownCocktailAdd = async (req, res) => {
    const { _id } = req.user;
    const { birthday } = req.user;
    const drinkThumb = req.file.path;
    const {ingredients} = req.params;
    const currentDate = new Date();
    const ageUser = differenceInYears(currentDate,  new Date(birthday));
    if (!req.file) {
    res.status(400).json( req.file === null );
     return;
    }
    const isAlcoholic = ageUser >= 18;
    const cocktailAdd = {
     ...req.body,
    drinkThumb,
  ingredients: JSON.stringify(req.body.ingredients),
    };
    console.log(cocktailAdd);

    const { error } = schema.validate(cocktailAdd);

    if (error) {
        res.status(400);
        throw HttpError(400, "Enter all fields");
    }

    const result = await recipesModel.create({ ...cocktailAdd, owner:_id});

    res.status(201).json({
        // code: 201,
        // message: 'Success',
        data:  result,
    });
};



// const ownCocktailAdd = async (req, res) => {
//   const { _id: owner } = req.user;
//  // const drinkThumb = req.file.path;
//   // const body = JSON.parse(req.body);
//   // console.log(req.body);
//   // console.log(body);
//   //if (!req.file.path) {
//     const newRecipe = await recipesModel.create({ ...req.body, drinkThumb: null, owner });
    
//     return req.json(newRecipe);
//   }

//  //const { path:  drinkThumb } = req.file;

//   try {
//   //  const fileName = `${owner}_${drinkThumb}`;

//   // const { url: drinkThumb } = await cloudinary.uploader.upload( {
//   //     folder: "cocktails",
//   //     public_id: fileName,
//   //     quality: 60,
//   //     crop: "fill",
//   //   });

//     const cocktailAdd = await recipesModel.create({
//       ...req.body,
//       drinkThumb,
//       owner,
//     });

//   await fs.unlink(drinkThumb);

//     res.status(201).json(cocktailAdd);
//   } catch (error) {
//   // await fs.unlink(drinkThumb);
//     throw error;
//   }
// //};


// const ownCocktailAdd = async (req, res) => {
//   const { _id: owner } = req.user;

//   try {
//     if (!req.file) {
//       const newRecipe = await recipesModel.create({ ...req.body, drinkThumb: null, owner });
//       return res.status(201).json(newRecipe);
//     }

//     const { path: tempUpload, originalname } = req.file;
//     const fileName = `${owner}_${originalname}`;

//     const { url: drinkThumb } = await cloudinary.uploader.upload(tempUpload, {
//       folder: "recipes",
//       public_id: fileName,
//       quality: 60,
//       crop: "fill",
//     });

//     const cocktailData = {
//       ...req.body,
//       drinkThumb,
//       owner,
//     };

//     const cocktailAdd = await recipesModel.create(cocktailData);

//     await fs.unlink(tempUpload);

//     res.status(201).json(cocktailAdd);
//   } catch (error) {
//     //await fs.unlink(tempUpload);
//     res.status(error.statusCode || 500).json({
//       code: error.statusCode || 500,
//       message: error.message || 'Internal Server Error',
//     });
//   }
// };

module.exports = ownCocktailAdd;