import express from 'express';
import bookRouter from './book.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = express();

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use ("/auth", authRouter);

export default router;