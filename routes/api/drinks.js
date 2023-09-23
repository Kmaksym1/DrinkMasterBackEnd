const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers/index");
const authenticate = require("../../middlewares/authenticate");
const errorHandler = require("../../helpers/errorHandler");

router.get("/mainpage",authenticate, errorHandler(drinks.getMainPage));
router.get("/byid/:recipeId",authenticate, errorHandler(drinks.getRecipeById));

module.exports = router;
