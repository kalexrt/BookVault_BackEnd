import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("ReviewModel");

export class ReviewModel extends BaseModel {
  //get all reviewable book
  static async getToReiviewBooks(userId: string) {
    logger.info("Called getToReiviewBooks");
    const data = this.queryBuilder()
      .select("*")
      .from("users_issued_books")
      .where("is_returned", true)
      .where("is_reviewed", false)
      .where("user_id", userId);
    
    if(!data) throw new Error("No book to review");
    return data;
  }

  //add new review and return the new avg rating of the reviewd book
  static async addReviewReturnAvgRating(
    userId: number,
    bookId: number,
    rating: number
  ) {
    logger.info("Called addReviewReturnAvgRating");
    const dataToInsert = {
      user_id: userId,
      book_id: bookId,
      rating: rating,
    };
    await this.queryBuilder().insert(dataToInsert).table("users_reviews");
    const newAvgRating = await this.queryBuilder()
      .avg("rating as avgRating")
      .from("users_reviews")
      .where("book_id", bookId)
      .first();
    return newAvgRating.avgRating;
  }
}
