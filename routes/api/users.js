const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { tokenAuthMiddleware, isValidId } = require("../../middlewares");

router.get("/current", tokenAuthMiddleware, ctrls.getCurrentUser);

router.patch("/update/:id", tokenAuthMiddleware, isValidId, ctrls.updateUser);

router.post("/subscribe", ctrls.subscribeEmail);

router.get("/subscribe/:id", tokenAuthMiddleware, ctrls.updateSubscribeEmail);

module.exports = router;
