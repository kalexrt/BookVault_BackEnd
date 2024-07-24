import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  deleteSelf,
} from "../controller/user.controller";

import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  getUserQuerySchema,
  updateUserBodySchema,
  userIdSchema,
} from "../schema/user.schema";

const router = express();

router
  .route("/")
  .get(
    authenticate,
    authorize("Librarian"),
    validateReqQuery(getUserQuerySchema),
    getUsers
  )
  .post(
    authenticate,
    authorize("Librarian"),
    validateReqBody(createUserBodySchema),
    createUser
  )
  .delete(authenticate, authorize("Member"), deleteSelf);

router
  .route("/:id")
  .get(
    authenticate,
    authorize("Librarian"),
    validateReqParams(userIdSchema),
    getUserById
  )
  .put(
    authenticate,
    authorize("Member"),
    validateReqParams(userIdSchema),
    validateReqBody(updateUserBodySchema),
    updateUserById
  )
  .delete(
    authenticate,
    authorize("SuperAdmin"),
    validateReqParams(userIdSchema),
    deleteUserById
  );

export default router;
