import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("StatsModel");

export class StatsModel extends BaseModel {
  static async getStats() {
    logger.info("Called getStats");

    const totalBooks = await this.queryBuilder()
      .count("* as totalBooks")
      .from("books")
      .first();

    const totalUsers = await this.queryBuilder()
      .count("* as totalUsers")
      .from("users")
      .first();

    const totalIssuedBooks = await this.queryBuilder()
      .count("* as totalIssuedBooks")
      .from("users_issued_books")
      .first();

    const totalReviews = await this.queryBuilder()
      .count("* as totalReviews")
      .from("users_reviews")
      .first();

    const mostPopularBook = await this.queryBuilder()
      .select("books.title")
      .count("users_issued_books.book_id as totalIssued")
      .from("users_issued_books")
      .join("books", "users_issued_books.book_id", "books.id")
      .groupBy("books.title")
      .orderBy("totalIssued", "desc")
      .first();

    const mostReviewedBook = await this.queryBuilder()
      .select("books.title")
      .count("users_reviews.book_id as totalReviews")
      .from("users_reviews")
      .join("books", "users_reviews.book_id", "books.id")
      .groupBy("books.title")
      .orderBy("totalReviews", "desc")
      .first();

    const mostActiveUser = await this.queryBuilder()
      .select("users.name")
      .count("users_issued_books.user_id as totalIssued")
      .from("users_issued_books")
      .join("users", "users_issued_books.user_id", "users.id")
      .groupBy("users.name")
      .orderBy("totalIssued", "desc")
      .first();

    const mostWantedBook = await this.queryBuilder()
      .select("books.title")
      .count("users_wishlist.book_id as totalWishlist")
      .from("users_wishlist")
      .join("books", "users_wishlist.book_id", "books.id")
      .groupBy("books.title")
      .orderBy("totalWishlist", "desc")
      .first();

    const data = {
      totalBooks: totalBooks.totalBooks,
      totalUsers: totalUsers.totalUsers,
      totalIssuedBooks: totalIssuedBooks.totalIssuedBooks,
      totalReviews: totalReviews.totalReviews,
      mostPopularBook: mostPopularBook.title,
      mostReviewedBook: mostReviewedBook.title,
      mostActiveUser: mostActiveUser.name,
      mostWantedBook:  mostWantedBook.title,
    };

    return data;
  }
}
