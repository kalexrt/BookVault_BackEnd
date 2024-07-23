import express from 'express';
import bookRouter from './book.routes';

const router = express();

router.use("/books", bookRouter);

export default router;