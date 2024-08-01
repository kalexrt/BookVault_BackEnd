import Joi from "joi";

//create book schema
export const createBookBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  isbn: Joi.string().required().messages({
    "any.required": "ISBN is required",
  }),
  authors: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one author is required",
      "any.required": "Authors are required",
    }),
  genres: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one genre is required",
      "any.required": "Genres are required",
    }),
  publishedDate: Joi.string().required().messages({
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
});

//book id schema
export const bookIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required",
    "number.base": "id must be a number",
  }),
}).options({
  stripUnknown: true,
});

//get book query schema
export const getBookQuerySchema = Joi.object({
  title: Joi.string().optional(),
  genre: Joi.string().optional(),
  isbn: Joi.string().optional(),
  author: Joi.string().optional(),
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
    .max(16)
    .optional()
    .messages({
      "number.base": "Size must be a number",
      "number.min": "Size must be at least 1",
      "number.max": "Size must be at most 16",
    })
    .default(30),
}).options({ stripUnknown: true });

//updatebook schema
export const updateBookBodySchema = Joi.object({
  title: Joi.string().optional().messages({
    "any.required": "Title is required",
  }),
  isbn: Joi.string().optional().messages({
    "any.required": "ISBN is required",
  }),
  authors: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one author is required",
      "any.required": "Authors are required",
    }),
  genres: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one genre is required",
      "any.required": "Genres are required",
    }),
  publishedDate: Joi.string().optional().messages({
    "any.required": "Published date is required",
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 0",
    "number.max": "Rating must be at most 5",
  }),
  totalReviews: Joi.number().integer().min(0).optional().messages({
    "number.base": "Total reviews must be a number",
    "number.integer": "Total reviews must be an integer",
    "number.min": "Total reviews must be greater than 0",
  }),
  totalCopies: Joi.number().integer().min(1).optional().messages({
    "number.base": "Total copies must be a number",
    "number.integer": "Total copies must be an integer",
    "number.min": "Total copies must be at least 1",
  }),
  availableCopies: Joi.number().integer().min(0).optional().messages({
    "number.base": "Available copies must be a number",
    "number.integer": "Available copies must be an integer",
    "number.min": "Available copies must be at least 0",
  }),
}).options({
  stripUnknown: true,
});
