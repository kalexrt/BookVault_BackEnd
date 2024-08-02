import Joi from "joi";

//get borrow query schema
export const getBorrowQuerySchema = Joi.object({
    book: Joi.string().optional(),
    user: Joi.string().optional(),
    page: Joi.number()
      .min(1)
      .optional()
      .messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be at least 1",
      })
      .default(1),
    size: Joi.number()
      .min(1)
      .max(30)
      .optional()
      .messages({
        "number.base": "Size must be a number",
        "number.min": "Size must be at least 1",
        "number.max": "Size must be at most 30",
      })
      .default(10),
  }).options({ stripUnknown: true });

  //create borrow schema
export const createBorrowBodySchema = Joi.object({
    userId: Joi.string().required().messages({
      "any.required": "User Id is required",
    }),
    bookId: Joi.string().required().messages({
      "any.required": "Book Id is required",
    }),
  });