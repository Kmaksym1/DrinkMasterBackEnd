const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers/index");
const authenticate = require("../../middlewares/authenticate");
const errorHandler = require("../../helpers/errorHandler");
const { upload } = require("../../middlewares");


router.get("/mainpage",authenticate, errorHandler(drinks.getMainPage));
router.get("/byid/:recipeId",authenticate, errorHandler(drinks.getRecipeById));
router.get("/own",authenticate,upload.single("cocktails"),errorHandler(drinks.getOwnCocktails));
router.post("/own/add", authenticate, errorHandler(drinks.ownCocktailAdd));
router.delete("/own/remove", authenticate, errorHandler(drinks.ownCocktailRemove));

module.exports = router;
