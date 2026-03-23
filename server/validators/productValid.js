import Joi from "joi";

export const validate = (schema, property = "body") =>
(req, res, next) => {

const { error } = schema.validate(req[property]);

if (error)
return res.status(422).json(error.message);

next();

};


export const createProductSchema = Joi.object({

name: Joi.string().required(),

category: Joi.string(),

code: Joi.string(),

gst: Joi.string(),

shortDescription: Joi.string(),

detailDescription: Joi.string(),

crops: Joi.string(),

packageType: Joi.string(),

showOnWebsite: Joi.alternatives().try(
Joi.boolean(),
Joi.string().valid("true","false")
),

newLaunch: Joi.alternatives().try(
Joi.boolean(),
Joi.string().valid("true","false")
),

featuredProduct: Joi.alternatives().try(
Joi.boolean(),
Joi.string().valid("true","false")
),

variants: Joi.alternatives().try(

Joi.array().items(
Joi.object({

capacity: Joi.string(),

unit: Joi.string(),

mrp: Joi.number(),

price: Joi.number(),

stock: Joi.number()

})
),

Joi.string()

),

images: Joi.array().items(Joi.string())

});


export const updateProductSchema =
createProductSchema.fork(
["name"],
(field)=>field.optional()
);


export const mongoIdSchema = Joi.object({

id: Joi.string().length(24).required()

});