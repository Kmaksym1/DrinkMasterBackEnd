const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");

const recipesSchema = new Schema(
  {
    drink: String,
    drinkAlternate: String,
    tags: String,
    video: String,
    category: String,
    IBA: String,
    alcoholic: String,
    glass: String,
    description: String,
    instructions: String,
    instructionsES: String,
    instructionsDE: String,
    instructionsFR: String,
    instructionsIT: String,
    instructionsRU: String,
    instructionsPL: String,
    instructionsUK: String,
    drinkThumb: String,
    ingredients: Array,
    // favorites: Array,
    shortDescription: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    popular: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipesSchema.post("save", handleMongooseError);

const schema = Joi.object({
  drink: Joi.string().required(),
  category: Joi.string().required(),
  alcoholic: Joi.string().required(),
  glass: Joi.string().required(),
  description: Joi.string(),
  instructions: Joi.string(),
  drinkThumb: Joi.string().required(),
  ingredients: Joi.array(),
  shortDescription: Joi.string().required(),
  owner: Joi.object(),
});

const recipesModel = model("recipes", recipesSchema);

module.exports = {
  recipesModel,
  schema,
};
