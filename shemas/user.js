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
