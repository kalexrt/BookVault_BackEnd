import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as borrowService from "../service/borrow.service";
import { getBorrowQuery } from "../interfaces/borrow.interface";

const logger = loggerWithNameSpace("BorrowController");

// create a new borrow
export async function createBorrow(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called createBorrow");
    const { body } = req;
    await borrowService.createBorrow(body,req.user.id);
    res.status(HttpStatusCodes.OK).json({
      message: "New book Issued",
    });
  } catch (error) {
    next(error);
  }
}

// get all borrows
export async function getBorrows(
  req: Request<any, any, any, getBorrowQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called getBorrows");
    const { query } = req;
    const data = await borrowService.getBorrows(query);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error); // pass error to the error handling middleware
  }
}

// return a book
export async function returnBook(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called returnBook");
    const { id } = req.params;
    await borrowService.returnBook(id, req.user.id);
    res.status(HttpStatusCodes.OK).json({
      message: "Book returned",
    });
  } catch (error) {
    next(error);
  }
}
