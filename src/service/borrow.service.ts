import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/Error";
import { Borrow, getBorrowQuery } from "../interfaces/borrow.interface";
import * as borrowModel from "../model/borrow.model";
import { BookModel } from "../model/book.model";
import { WishlistModel } from "../model/wishlist.model";
import { NotificationModel } from "../model/notification.model";

const logger = loggerWithNameSpace("Borrow Service");

// get all borrows
export async function getBorrows(query: getBorrowQuery){
  const data = await borrowModel.BorrowModel.getBorrows(query);
  if (!data) throw new NotFoundError("No Loans found");
  const count = await borrowModel.BorrowModel.count(query);
  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };
  return { data, meta };
};

// create a new borrow
export async function createBorrow (borrow: Borrow, createdBy: string){
  logger.info("Called createBorrow");
  const book = await BookModel.getBookById(borrow.bookId.toString());
  if(book.available_copies > 0){
    await borrowModel.BorrowModel.createBorrow(borrow, createdBy);
     // Reduce available copies by 1
     await BookModel.updateBookById(book.id, { availableCopies: book.available_copies - 1 }, createdBy);
  }else{
    throw new NotFoundError("No available copies");
  }
};
//return the book
export  async function returnBook(id: string, userId: string){
  logger.info("Called returnBook");
  const bookId = await borrowModel.BorrowModel.getBookIdByBorrowId(id); //get book id from borrow id
  const book = await BookModel.getBookById(bookId); 
  await BookModel.updateBookById(bookId, { availableCopies: book.available_copies + 1 }, userId); //update the book's available copies
  await borrowModel.BorrowModel.returnBook(id, userId); //update the borrow book table
  const wishlistInfo = await WishlistModel.getWishlistIdsByBookId(bookId); //get wishlist ids for the book
  //deactivate the wishlist and send notification
  for (const { id, user_id } of wishlistInfo) {
    await WishlistModel.deactivateWishlist(id);
    await NotificationModel.addBookAvailableNotification(user_id, book.title);
  }
}
