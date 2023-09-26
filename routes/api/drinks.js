const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers/index");
const authenticate = require("../../middlewares/authenticate");
const errorHandler = require("../../helpers/errorHandler");
const { upload } = require("../../middlewares");


router.get("/mainpage", errorHandler(drinks.getMainPage));
router.get("/popular", errorHandler(drinks.getPopularCocktails));
router.get("/:recipeId",  errorHandler(drinks.getRecipeById));
router.get("/search", errorHandler(drinks.searchCocktails));
router.get("/own",errorHandler(drinks.getOwnCocktails));
router.post("/own/add",  upload.single("cocktails"),errorHandler(drinks.ownCocktailAdd));
router.delete("/own/remove",  errorHandler(drinks.ownCocktailRemove));


module.exports = router;
