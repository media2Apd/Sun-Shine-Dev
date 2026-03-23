import Joi from "joi";

// ─── Reusable: handle Joi validation errors ───────────────────────────────────
export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,    // collect ALL errors at once
      allowUnknown: false,  // reject unknown fields
      stripUnknown: true,   // remove unknown fields silently
    });

    if (error) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((e) => ({
          field: e.path.join("."),
          message: e.message.replace(/['"]/g, ""),
        })),
      });
    }

    next();
  };
};

// ─── Create Category Schema ───────────────────────────────────────────────────
export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Category name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be under 100 characters",
    "any.required": "Category name is required",
  }),

  url: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base":
        "URL must contain only lowercase letters, numbers, and hyphens",
    }),

  shortDescription: Joi.string().trim().max(300).optional().allow("").messages({
    "string.max": "Short description must be under 300 characters",
  }),

  description: Joi.string().trim().max(2000).optional().allow("").messages({
    "string.max": "Description must be under 2000 characters",
  }),

  price: Joi.number().min(0).optional().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a positive number",
  }),

  showOnWebsite: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "showOnWebsite must be true or false",
    }),

  allowOrders: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "allowOrders must be true or false",
    }),

  featuredProduct: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "featuredProduct must be true or false",
    }),

  status: Joi.string().valid("Active", "Inactive").optional().messages({
    "any.only": "Status must be Active or Inactive",
  }),

  categoryType: Joi.string().trim().optional().allow("").messages({
    "string.empty": "Category type cannot be empty",
  }),
});

// ─── Update Category Schema (all fields optional) ─────────────────────────────
export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be under 100 characters",
  }),

  url: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base":
        "URL must contain only lowercase letters, numbers, and hyphens",
    }),

  shortDescription: Joi.string().trim().max(300).optional().allow("").messages({
    "string.max": "Short description must be under 300 characters",
  }),

  description: Joi.string().trim().max(2000).optional().allow("").messages({
    "string.max": "Description must be under 2000 characters",
  }),

  price: Joi.number().min(0).optional().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a positive number",
  }),

  showOnWebsite: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "showOnWebsite must be true or false",
    }),

  allowOrders: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "allowOrders must be true or false",
    }),

  featuredProduct: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .optional()
    .messages({
      "any.only": "featuredProduct must be true or false",
    }),

  status: Joi.string().valid("Active", "Inactive").optional().messages({
    "any.only": "Status must be Active or Inactive",
  }),

  categoryType: Joi.string().trim().optional().allow(""),

  removeIcon: Joi.string().valid("true", "false").optional().messages({
    "any.only": "removeIcon must be true or false",
  }),

  removeImage: Joi.string().valid("true", "false").optional().messages({
    "any.only": "removeImage must be true or false",
  }),
});

// ─── Mongo ID Param Schema ────────────────────────────────────────────────────
export const mongoIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid ID — must be a valid MongoDB ObjectId",
      "any.required": "ID is required",
    }),
});