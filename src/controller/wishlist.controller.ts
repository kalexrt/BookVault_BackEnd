import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as wishlistService from "../service/wishlist.service";

const logger = loggerWithNameSpace("WishlistController");

// create a new borrow
export async function addBookToWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called addBookToWishlist");
    const { body } = req;
    await wishlistService.addBookToWishlist(body.bookId, req.user.id);
    res.status(HttpStatusCodes.OK).json({
      message: "New book added to wishlist",
    });
  } catch (error) {
    next(error);
  }
}

