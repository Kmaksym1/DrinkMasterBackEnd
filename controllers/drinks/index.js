const getMainPage = require("./getMainPage");
const getRecipeById = require("./getRecipeById");
const getOwnCocktails = require("./getOwnCocktails");
const ownCocktailAdd = require("./ownCocktailAdd");
const ownCocktailRemove = require("./ownCocktailRemove");
const searchCocktails = require("./searchCocktails");
const getPopularCocktails = require("./getPopularCocktails");
const addCocktailToFavorites = require("./addCocktailToFavorites");
const removeCocktailFromFavorites = require("./removeCocktailFromFavorites");

module.exports = {
  getMainPage,
  getRecipeById,
  getOwnCocktails,
  ownCocktailAdd,
  ownCocktailRemove,
  searchCocktails,
  getPopularCocktails,
  addCocktailToFavorites,
  removeCocktailFromFavorites,
};
