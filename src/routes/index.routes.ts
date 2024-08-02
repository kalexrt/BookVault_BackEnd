import express from 'express';
import bookRouter from './book.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import libRouter from './librarian.routes';
import borrowRouter from './borrow.routes';

const router = express.Router();

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use ("/auth", authRouter);
router.use ("/librarian", libRouter);
router.use ("/borrows", borrowRouter);


export default router;