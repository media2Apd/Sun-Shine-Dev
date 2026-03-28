// import { body } from "express-validator";
import Joi from "joi";
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Valid email required",
    "any.required": "Email is required"
  }),

  otp: Joi.string().required().messages({
    "any.required": "OTP required"
  }),

  newPassword: Joi.string().min(6).required().messages({
    "string.min": "Password must be 6 characters long",
    "any.required": "New password is required"
  })
});

export const updateProfileValidator = Joi.object({
  _id: Joi.string().optional(),
  firstName: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  email: Joi.string().allow(""),
  gender: Joi.string().valid("male", "female", "other", "").allow(""),
  birthday: Joi.date().allow(null),
  phone: Joi.string().allow("").max(15)
});
