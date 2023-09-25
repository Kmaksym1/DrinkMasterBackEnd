const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { authenticate, isValidId } = require("../../middlewares");

router.get("/current", authenticate, ctrls.getCurrentUser);

router.patch("/update/:id", authenticate, isValidId, ctrls.updateUser);

router.post("/subscribe", ctrls.subscribeEmail);

router.get("/subscribe/:id", authenticate, ctrls.updateSubscribeEmail);

module.exports = router;
