import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as notificationService from "../service/stats.service";

const logger = loggerWithNameSpace("Stats Controller");

export async function getStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Called getStats");
  try {
    const data = await notificationService.getStats();
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
