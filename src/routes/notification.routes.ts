import express from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getNotifications, markNotificationAsRead } from "../controller/notification.controller";
import { validateReqParams } from "../middlewares/validator.middleware";
import { userIdSchema } from "../schema/user.schema";

const router = express.Router();

router.route("/").get(authenticate, authorize("Member"), getNotifications);

router
  .route("/:id")
  .put(
    authenticate,
    authorize("Member"),
    validateReqParams(userIdSchema),
    markNotificationAsRead
  );

export default router;
