const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { signUpSchema, signInSchema } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), ctrl.signUp);

router.post("/signin", validateBody(signInSchema), ctrl.signIn);

router.post("/signout", authenticate, ctrl.signOut);

module.exports = router;
