import express from 'express';
import bookRouter from './book.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import libRouter from './librarian.routes';

const router = express.Router();

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use ("/auth", authRouter);
router.use ("/librarian", libRouter)

export default router;