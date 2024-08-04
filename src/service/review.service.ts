import { BookModel } from "../model/book.model";
import { BorrowModel } from "../model/borrow.model";
import { ReviewModel } from "../model/review.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ReviewService");

export async function getToReiviewBooks(userId: string) {
  logger.info("Called getToReiviewBooks");
  const data = ReviewModel.getToReiviewBooks(userId);
  return data;
}

export async function addReviewReturnAvgRating(
  userId: string,
  borrowId: string,
  rating: string
) {
  logger.info("Called addReviewReturnAvgRating");
  const bookId = await BorrowModel.getBookIdByBorrowId(borrowId);
  const book = await BookModel.getBookById(bookId);
  const newAvgRating = await ReviewModel.addReviewReturnAvgRating(
    +userId,
    +bookId,
    +rating
  );
  await BorrowModel.updateIsReviewed(borrowId); // update is_reviewed to true in users_issued_books
  await BookModel.updateBookById(
    bookId,
    { rating: +newAvgRating, totalReviews: book.total_reviews + 1 },
    userId
  ); // update book rating in books
}
