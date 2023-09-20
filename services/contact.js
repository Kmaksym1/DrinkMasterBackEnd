// Робота з базою даних - запити

const { Contact } = require("../shemas/contacts");

const getAllContacts = async ({ owner }, req) => {
  const { page = 1, limit = 30 } = req.query;
  const skip=(page-1)*limit
  return Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription -_id")
};

const getById = async (id) => {
  return Contact.findOne({ _id: id });
};

const deleteContact = async (id) => {
  return Contact.findOneAndRemove({ _id: id });
};
const createContact = async ({ name, phone, email, owner }) => {
  return Contact.create({ name, phone, email, owner });
};
const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};
const favoriteContacts = async ( owner ) => {
  return Contact.find({favorite:true, owner})
}

module.exports = {
  getAllContacts,
  getById,
  deleteContact,
  createContact,
  updateContact,
  favoriteContacts,
};
