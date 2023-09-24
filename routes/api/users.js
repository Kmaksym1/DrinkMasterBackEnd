// const express = require("express");
// const {
//   signInController,
//   getCurrent,
//   signOutController,
//   updateSubscription,
// } = require("../../controllers/auth");
// const { validateBody, authenticate } = require("../../middlewares");
// const { schemas } = require("../../shemas/user");

// const userRouter = express.Router();

// userRouter.post("/signin", validateBody(schemas.logInSchema), signInController);
// userRouter.get("/current", authenticate, getCurrent);
// userRouter.post("/signout", authenticate, signOutController);
// userRouter.patch("/", authenticate, updateSubscription);

// module.exports = userRouter;

const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { tokenAuthMiddleware, isValidId } = require("../../middlewares");

router.get("/current", tokenAuthMiddleware, ctrls.getCurrentUser);

router.patch("/update/:id", tokenAuthMiddleware, isValidId, ctrls.updateUser);

module.exports = router;
