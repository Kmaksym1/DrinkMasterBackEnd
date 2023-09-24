const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const getMainPage = async (req, res) => {
  const { adultUser } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  let queryConditions  = { alcoholic: "Non alcoholic" };
  if (adultUser) { queryConditions  = {} };
    
const drinks = await recipesModel.find(queryConditions ,"",{skip,limit});
  res.status(200).json({
    code: 200,
    quantity: drinks.length,
    data: drinks
 });
}

module.exports = getMainPage;
