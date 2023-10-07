const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const errorHandler = require("../../helpers/errorHandler");
const { upload } = require("../../middlewares");

router.get("/mainpage", authenticate, errorHandler(drinks.getMainPage));
router.get("/popular", authenticate, errorHandler(drinks.getPopularCocktails));
router.get("/search", authenticate, errorHandler(drinks.searchCocktails));
router.get("/favorite", authenticate, drinks.getAllFavorites);
router.get("/own/all", authenticate, errorHandler(drinks.getOwnCocktails));
router.post(
  "/own/add",
  authenticate,
  upload.single("drinkThumb"),
  errorHandler(drinks.ownCocktailAdd)
);
router.delete(
  "/own/remove",
  authenticate,
  errorHandler(drinks.ownCocktailRemove)
);
router.post("/favorite/add", authenticate, drinks.addCocktailToFavorites);
router.delete(
  "/favorite/remove",
  authenticate,
  drinks.removeCocktailFromFavorites
);
router.get("/:id", authenticate, errorHandler(drinks.getRecipeById));

module.exports = router;
