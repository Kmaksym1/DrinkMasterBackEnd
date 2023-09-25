const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require("../helpers/handleMongooseError");

const recipesSchema = new Schema(
    {
        drink:{
            type:String,
        },
        drinkAlternate:{
            type:String,
        },
        tags:{
            type:String,
        },
        video:{
            type:String,
        },
        category:{
            type:String,
        },
        IBA:{
            type:String,
        },
        alcoholic:{
            type:String,
        },
        glass:{
            type:String,
        },
        description:{
            type:String,
        },
        instructions:{
            type:String,
        },
        instructionsES:{
            type:String,
        },
        instructionsDE:{
            type:String,
        },
        instructionsFR:{
            type:String,
        },
        instructionsIT:{
            type:String,
        },
        instructionsRU:{
            type:String,
        },
        instructionsPL:{
            type:String,
        },
        instructionsUK:{
            type:String,
        },
        drinkThumb:{
            type:String,
        },
        ingredients:{
            type:Array,
        },
        favorites:{
            type:Array,
        },
        shortDescription:{
            type:String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

recipesSchema.post("save", handleMongooseError);

const schema = Joi.object({
    drink: Joi.string(),
    tags: Joi.string(),
    category: Joi.string(),
    alcoholic: Joi.string(),
    glass: Joi.string(),
    description: Joi.string(),
    instructions: Joi.string(),
    instructionsUK: Joi.string(),
    drinkThumb: Joi.string(),
    ingredients: Joi.array(),
    shortDescription: Joi.string(),
});

const recipesModel = model('recipes', recipesSchema);

module.exports = {
    recipesModel,
    schema,
};
