import { NotificationModel } from "../model/notification.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Notification Service");

export async function getNotifications(userId: string){
    logger.info("Called getNotifications");
    return await NotificationModel.getNotifications(userId);
}

export async function markNotificationAsRead(notificationId: string){
    logger.info("Called markNotificationAsRead");
    return await NotificationModel.markNotificationAsRead(notificationId);
}