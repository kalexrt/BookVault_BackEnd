import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as notificationService from "../service/notification.service";

const logger = loggerWithNameSpace("Notification Controller");

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Called getNotifications");
  try {
    const data = await notificationService.getNotifications(req.user.id);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function markNotificationAsRead(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  logger.info("Called markNotificationAsRead");
  try {
    console.log(req.params.id);
    await notificationService.markNotificationAsRead(req.params.id);
    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Notification marked as read" });
  } catch (error) {
    next(error);
  }
}
