import express from "express";
import bookRouter from "./book.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import libRouter from "./librarian.routes";
import borrowRouter from "./borrow.routes";
import wishListRouter from "./wishlist.routes";
import notificationRouter from "./notification.routes"
import reviewRouter from "./review.routes";
import statsRouter from "./stats.routes";
const router = express.Router();

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/librarian", libRouter);
router.use("/borrows", borrowRouter);
router.use("/wishlist", wishListRouter);
router.use("/notifications", notificationRouter);
router.use("/reviews", reviewRouter);
router.use("/stats", statsRouter);

export default router;
