import express from "express";
import uploader from "../middlewares/fileupload.middleware";
import { defaultUploadField } from "../constants/constants";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createBook,
  deleteBookById,
  getBookById,
} from "../controller/book.controller";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import { bookIdSchema, createBookBodySchema, getBookQuerySchema } from "../schema/book.schema";

const router = express.Router();

router
  .route("/")
  .get(validateReqQuery(getBookQuerySchema))
  .post(
    authenticate,
    authorize("Librarian"),
    uploader.fields(defaultUploadField),
    validateReqBody(createBookBodySchema),
    createBook
  );

router
  .route("/:id")
  .get(validateReqParams(bookIdSchema), getBookById)
  .put()
  .delete(
    authenticate,
    authorize("Librarian"),
    validateReqParams(bookIdSchema),
    deleteBookById
  );

export default router;
