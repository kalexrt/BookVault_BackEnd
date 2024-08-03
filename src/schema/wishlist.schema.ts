import Joi from "joi";

//create borrow schema
export const createWishlistBodySchema = Joi.object({
  bookId: Joi.string().required().messages({
    "any.required": "Book Id is required",
  }),
});
