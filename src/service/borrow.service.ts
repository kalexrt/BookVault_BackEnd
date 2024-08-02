import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/Error";
import { getBorrowQuery } from "../interfaces/borrow.interface";
import * as borrowModel from "../model/borrow.model";

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
export async function createBorrow (borrow: any, createdBy: string){
  logger.info("Called createBorrow");
  await borrowModel.BorrowModel.createBorrow(borrow, createdBy);
};

export  async function returnBook(id: string, userId: string){
  logger.info("Called returnBook");
  await borrowModel.BorrowModel.returnBook(id, userId);
}
