import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("Wishlist Model");

export class WishlistModel extends BaseModel {
  // Add to wishlist
  static async addToWishlist(bookId: string, userId: string) {
    logger.info("Called addToWishlist");
    const dataToInsert = {
      user_id: userId,
      book_id: bookId,
    };
    await this.queryBuilder().insert(dataToInsert).table("users_wishlist");
  }

  // Get wishlsit Id for a book and also return user_id to add notifications
  static async getWishlistIdsByBookId(bookId: string) {
    logger.info("Called getWishlistIdsByBookId");
    const results = await this.queryBuilder()
      .select("id", "user_id")
      .from("users_wishlist")
      .where("book_id", bookId)
      .where("is_active", true);
    if (results.length === 0) {
      logger.info("No active wishlists found for the book");
      return [];
    }
    return results.map((result) => ({
      id: result.id,
      user_id: result.user_id,
    }));
  }

  // Deactivate from wishlist
  static async deactivateWishlist(wishlistId: string) {
    logger.info("Called deactivateWishlist");
    return this.queryBuilder()
      .update({ is_active: false })
      .from("users_wishlist")
      .where("id", wishlistId);
  }
}
