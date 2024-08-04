import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("Notification Model");

export class NotificationModel extends BaseModel{

    static async addBookAvailableNotification(userId: string, bookTitle: string){
        logger.info("Called addBookAvailableNotification");
        const dataToInsert = {
            user_id: userId,
            notification_text: `${bookTitle} is now available`
        };
        await this.queryBuilder().insert(dataToInsert).table("users_notifications");
    }

    static async getNotifications(userId: string){
        logger.info("Called getNotifications");
        return this.queryBuilder()
            .select("*")
            .from("users_notifications")
            .where("user_id", userId)
            .where("is_read", false)
            .orderBy("created_at", "desc");
    }

    static async markNotificationAsRead(notificationId: string){
        logger.info("Called markNotificationAsRead");
        return this.queryBuilder()
            .update({ is_read: true })
            .from("users_notifications")
            .where("id", notificationId);
    }
}