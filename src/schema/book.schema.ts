import Joi from "joi";

//create book schema
export const createBookBodySchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required",
    }),
    isbn: Joi.string().required().messages({
        "any.required": "ISBN is required",
    }),
    authors: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "array.min": "At least one author is required",
        "any.required": "Authors are required",
    }),
    genres: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "array.min": "At least one genre is required",
        "any.required": "Genres are required",
    }),
    publishedDate: Joi.date().required().messages({
        "any.required": "Published date is required",
    }),
    totalCopies: Joi.number().integer().min(1).required().messages({
        "number.base": "Total copies must be a number",
        "number.integer": "Total copies must be an integer",
        "number.min": "Total copies must be at least 1",
        "any.required": "Total copies are required",
    }),
}).options({
    stripUnknown: true,
})

//book id schema
export const bookIdSchema = Joi.object({
    id: Joi.number().required().messages({
      "any.required": "Id is required",
      "number.base": "id must be a number",
    }),
  }).options({
    stripUnknown: true,
  });