// const jwt = require("jsonwebtoken");
// const { HttpError } = require("../helpers");
// const { User } = require("../shemas/user");

// const { SECRET } = process.env;

// const authenticate = async (req, res, next) => {
//   const { authorization = "" } = req.headers;

//   const [bearer, token] = authorization.split(" ");
//   if (bearer !== "Bearer") {
//     next(HttpError(401));
//   }

//   try {
//     const { id } = jwt.verify(token, SECRET);

//     const user = await User.findById(id);

//     if (!user || !user.token || user.token !== token) {
//       next(HttpError(401));
//     }
//     req.user = user;
//     next();
//   } catch {
//     next(HttpError(401));
//   }
// };
// module.exports = authenticate;

// const jwt = require("jsonwebtoken");
const { UserModel } = require("../shemas/user");
const { HttpError } = require("../helpers");

// const { PRIVATE_KEY } = process.env;

const tokenAuthMiddleware = async (req, res, next) => {
  //   const { authorization = " " } = req.headers;
  //   const [bearer, token] = authorization.split(" ");

  //   if (bearer !== "Bearer") {
  //     next(HttpError(401, "Not authorized"));
  //   }

  try {
    // const { id } = jwt.verify(token, PRIVATE_KEY);
    console.log(req.body);
    const { id } = req.body;

    const user = await UserModel.findById(id);

    console.log(user);

    if (!user) {
      return next(HttpError(404, "User not found"));
    }
    // if (!user || !user.token || user.token !== token) {
    //   next(HttpError(401, "Not authorized"));
    // }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = tokenAuthMiddleware;
