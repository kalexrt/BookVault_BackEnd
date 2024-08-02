import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/Error";
import { Borrow, getBorrowQuery } from "../interfaces/borrow.interface";
import * as borrowModel from "../model/borrow.model";
import { BookModel } from "../model/book.model";
import { Book } from "../interfaces/book.interface";

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
  const bookId = await borrowModel.BorrowModel.getBookIdByBorrowId(id);
  const book = await BookModel.getBookById(bookId);
  await BookModel.updateBookById(bookId, { availableCopies: book.available_copies + 1 }, userId);
  await borrowModel.BorrowModel.returnBook(id, userId);
}
