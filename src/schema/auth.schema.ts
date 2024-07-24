import Joi from "joi";

//login user schema
export const loginUserBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string().required().messages({
    "any.required": "Pass is required",
  }),
}).options({
  stripUnknown: true,
});

//register user schema
export const registerUserBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Pass is required",
      "string.min": "Password must be 8 characters minimum",
      "password.uppercase": "Password must have 1 Uppercase Charcter",
      "password.lowercase": "Password must have 1 lowercase Charcter",
      "password.special": "Password must have 1 Special",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%^&*.,/]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  age: Joi.number().min(1).max(100).required().messages({
    "any.requied": "Id is required",
    "number.min": "Age must be positive",
    "number.max": "Age cannot be over 150",
  }),
  gender: Joi.string().required().messages({
    "any.required": "gender is required",
  }),
}).options({
  stripUnknown: true,
});
