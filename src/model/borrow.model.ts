import { Borrow, getBorrowQuery } from "../interfaces/borrow.interface";
import { BaseModel } from "./Base.model";

export class BorrowModel extends BaseModel {
  //create borrow
  static async createBorrow(borrow: Borrow, createdBy: string) {
    const dataToInsert = {
      user_id: borrow.userId,
      book_id: borrow.bookId,
      created_by: createdBy,
    };
    await this.queryBuilder().insert(dataToInsert).table("users_issued_books");
  }
  //get all borrows
  static getBorrows(filter: getBorrowQuery) {
    const { page, size, book, user } = filter;
    const query = this.queryBuilder()
      .select(
        "users_issued_books.*",
        "users.name as user_name",
        "books.title as book_title"
      ) 
      .from("users_issued_books")
      .innerJoin("users", "users_issued_books.user_id", "users.id")
      .innerJoin("books", "users_issued_books.book_id", "books.id")
      .where("users_issued_books.is_returned", false)
      .limit(size!)
      .offset((page! - 1) * size!);

    if (book) {
      query.where("books.title", "like", `%${book}%`);
    }

    if (user) {
      query.where("users.name", "like", `%${user}%`);
    }

    return query;
  }

  //count users
  static count(filter: getBorrowQuery) {
    const { book, user } = filter;
    const query = this.queryBuilder()
      .count("*")
      .table("users_issued_books")
      .innerJoin("users", "users_issued_books.user_id", "users.id")
      .innerJoin("books", "users_issued_books.book_id", "books.id")
      .where("users_issued_books.is_returned", false)
      .first();

    if (book) {
      query.where("books.title", "like", `%${book}%`);
    }

    if (user) {
      query.where("users.name", "like", `%${user}%`);
    }

    return query;
  }

  //return book
  static returnBook(id: string, updatedBy: string) {
    return this.queryBuilder()
      .table("users_issued_books")
      .where("id", id)
      .update({
        returned_date: new Date(),
        updated_by: updatedBy,
        is_returned: true,
      });
  }
}
