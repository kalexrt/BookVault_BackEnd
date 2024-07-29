import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
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
import {
  createLibrarian,
  getLibrarians,
} from "../controller/librarian.controller";
import { deleteSelf } from "../controller/user.controller";

const router = express.Router();

router
  .route("/")
  .get(
    authenticate,
    authorize("SuperAdmin"),
    validateReqParams(getUserQuerySchema),
    getLibrarians
  )
  .post(
    authenticate,
    authorize("SuperAdmin"),
    validateReqBody(createUserBodySchema),
    createLibrarian
  )
  .delete(authenticate, authorize("Librarian"), deleteSelf);

router.route("/:id").put();

export default router;
