import express from 'express';
import bookRouter from './book.routes';
import userRouter from './user.routes';

const router = express();

router.use("/books", bookRouter);
router.use("/users", userRouter);

export default router;