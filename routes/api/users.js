const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { authenticate, isValidId, upload } = require("../../middlewares");

router.get("/current", authenticate, ctrls.getCurrentUser);

router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  ctrls.updateUser
);

router.post("/subscribe", ctrls.subscribeEmail);

module.exports = router;
