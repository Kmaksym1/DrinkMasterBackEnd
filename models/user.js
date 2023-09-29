const Joi = require("joi");
const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
    subscribe: {
      type: Boolean,
      default: false,
    },
    favoriteCocktails: [
      {
        type: Object,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  birthday: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  emailSchema,
  signUpSchema,
  signInSchema,
};
