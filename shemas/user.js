// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;
// const Joi = require("joi");
// const crypto = require("node:crypto");
// require("dotenv").config();

// // const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const userSchema = new Schema(
//   {
    
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const makeHash = async (password) => {
//   return new Promise((resolve, reject) => {
//     crypto.scrypt(password, process.env.SALT, 64, (err, hash) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(hash.toString("hex"));
//     });
//   });
// };

// userSchema.methods.setPassword = async function (password) {
//   try {
//     this.password = await makeHash(password);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// userSchema.methods.validPassword = async function (password) {
//   try {
//     const hash = await makeHash(password);
//     return hash === this.password;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const signUpSchema = Joi.object({  
  
// });

// const logInSchema = Joi.object({
  
// });

// const schemas = {
//   signUpSchema,
//   logInSchema,
// };
// const User = model("User", userSchema);

// module.exports = {
//   User,
//   schemas,
// };

const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

userSchema.post("save", handleMongooseError);

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
  schemas,
};
