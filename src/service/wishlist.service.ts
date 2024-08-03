import { WishlistModel } from "../model/wishlist.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Wishlist Service");

export async function addBookToWishlist(bookId: string, userId: string) {
  logger.info("Called addBookToWishlist");
  await WishlistModel.addToWishlist(bookId, userId);
}