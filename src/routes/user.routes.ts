import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  deleteSelf,
  getMyself,
  updateSelf
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

const router = express.Router();

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
  .delete(authenticate, authorize("Member"), deleteSelf)
  .put(authenticate, authorize("Member"),validateReqBody(updateUserBodySchema), updateSelf);
  
router.route("/self").get(authenticate,authorize("Member"), getMyself);

router
  .route("/:id")
  .get(
    authenticate,
    authorize("SuperAdmin"),
    validateReqParams(userIdSchema),
    getUserById
  )
  .put(
    authenticate,
    authorize("SuperAdmin"),
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
