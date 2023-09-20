const express = require("express");
const router = express.Router();
const {
  getContactsList,
  getContactsById,
  removeContact,
  addContact,
  updateFavorite,
  updateContactById,
  getFavoriteContacts,
} = require("../../controllers/contact");

const { validateBody, authenticate } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../shemas/contacts");

router.get("/all", authenticate, getContactsList);

router.get("/:contactId", authenticate, getContactsById);

router.post("/", authenticate, validateBody(addSchema), addContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(addSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", authenticate, removeContact);
router.get("/", authenticate, getFavoriteContacts);

module.exports = router;
