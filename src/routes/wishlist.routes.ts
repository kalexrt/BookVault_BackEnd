import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  validateReqBody,
} from "../middlewares/validator.middleware";
import { createWishlistBodySchema } from "../schema/wishlist.schema";
import { addBookToWishlist } from "../controller/wishlist.controller";

const router = express.Router();
router
  .route("/")
  .post(
    authenticate,
    authorize("Member"),
    validateReqBody(createWishlistBodySchema),
    addBookToWishlist
  );

export default router;
