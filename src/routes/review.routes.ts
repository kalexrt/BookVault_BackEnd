import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getToReiviewBooks ,addReviewReturnAvgRating } from "../controller/review.controller";

const router = express.Router();

router.route("/").get(authenticate, authorize("Member"), getToReiviewBooks);
router
  .route("/")
  .post(authenticate, authorize("Member"), addReviewReturnAvgRating);
export default router;
