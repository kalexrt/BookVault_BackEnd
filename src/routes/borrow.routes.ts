import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  validateReqBody,
  validateReqQuery,
  validateReqParams,
} from "../middlewares/validator.middleware";
import { createBorrowBodySchema, getBorrowQuerySchema } from "../schema/borrow.schema";
import { createBorrow, getBorrows, returnBook } from "../controller/borrow.controller";
import { userIdSchema } from "../schema/user.schema";

const router = express.Router();

router
  .route("/")
  .get(
    authenticate,
    authorize("Librarian"),
    validateReqQuery(getBorrowQuerySchema),
    getBorrows
  )
  .post(
    authenticate,
    authorize("Librarian"),
    validateReqBody(createBorrowBodySchema),
    createBorrow
  );

router
  .route("/:id")
  .put(
    authenticate,
    authorize("Librarian"),
    validateReqParams(userIdSchema),
    returnBook
  );

  export default router;
