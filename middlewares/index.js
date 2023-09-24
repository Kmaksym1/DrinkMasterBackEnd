// const validateBody = require("./validateBody");
// const authenticate = require("./authenticate")

// module.exports = {
//     validateBody,
//     authenticate,
// }
const tokenAuthMiddleware = require("./authenticate");
const isValidId = require("./isValidId");

module.exports = {
  tokenAuthMiddleware,
  isValidId,
};
