const express = require("express");
const router = express.Router();
const ctrls = require("../../controllers/users");
const { authenticate, isValidId, upload } = require("../../middlewares");
const { checkFile } = require("../../helpers");

router.get("/current", authenticate, ctrls.getCurrentUser);

router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  checkFile,
  ctrls.updateUser
);

router.post("/subscribe", ctrls.subscribeEmail);

module.exports = router;
