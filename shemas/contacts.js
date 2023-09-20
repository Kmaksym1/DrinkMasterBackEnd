const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneShema = /^\+?[\d-]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      match: phoneShema,
      required: [true, "Phone is Required"],
    },

    email: {
      type: String,
      default: "",
      required: [true, "Email is Required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // назва колекції з якої id
      required: true,
    },
  },
  { versionKey: false, timestamps: true } // час створення документа createdAt та час оновлення updatedAt
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(phoneShema).required(),
  email: Joi.string().email().required(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
