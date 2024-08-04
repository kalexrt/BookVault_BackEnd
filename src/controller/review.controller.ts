import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as reviewService from "../service/review.service";

const logger = loggerWithNameSpace("Review Controller");

export async function getToReiviewBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Called getToReiviewBooks");
  try {
    const data = await reviewService.getToReiviewBooks(req.user.id);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function addReviewReturnAvgRating(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Called addReviewReturnAvgRating");
  try {
    const { borrowId, rating } = req.body;
    await reviewService.addReviewReturnAvgRating(req.user.id, borrowId, rating);
    res.status(HttpStatusCodes.OK).json({ message: "Review added" });
  } catch (error) {
    next(error);
  }
}
