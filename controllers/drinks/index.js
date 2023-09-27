const getMainPage = require("./getMainPage");
const getRecipeById = require("./getRecipeById");
const getOwnCocktails = require("./getOwnCocktails");
const ownCocktailAdd = require("./ownCocktailAdd");
const ownCocktailRemove = require("./ownCocktailRemove");
const searchCocktails = require("./searchCocktails");
const getPopularCocktails = require("./getPopularCocktails");

module.exports = {
    getMainPage,
    getRecipeById,
    getOwnCocktails,
    ownCocktailAdd,
    ownCocktailRemove,
    searchCocktails,
    getPopularCocktails,
}
