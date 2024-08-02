import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  validateReqBody,
  validateReqQuery,
} from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  getUserQuerySchema,
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
    validateReqQuery(getUserQuerySchema),
    getLibrarians
  )
  .post(
    authenticate,
    authorize("SuperAdmin"),
    validateReqBody(createUserBodySchema),
    createLibrarian
  )
  .delete(authenticate, authorize("SuperAdmin"), deleteSelf);

export default router;
