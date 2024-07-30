import { Book, getBookQuery } from "../interfaces/book.interface";
import { uploadSingleImage } from "../utils/fileUploader";
import loggerWithNameSpace from "../utils/logger";
import * as bookModel from "../model/book.model";
import { NotFoundError } from "../error/Error";

const logger = loggerWithNameSpace("BookService");

//get books
export async function getBooks(query: getBookQuery) {
  logger.info("Called getBooks");
  const data = await bookModel.BookModel.getBooks(query);
  if (!data) throw new NotFoundError("No users found");
  const count = await bookModel.BookModel.count(query);
  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };
  return { data, meta };
}

//create book
export async function createBook(
  book: Book,
  imageFile: { [key: string]: Express.Multer.File[] },
  createdBy: string
) {
  logger.info("Called createBook");
  const fileUpload = await uploadSingleImage(imageFile);
  if (!fileUpload) throw new Error("Error uploading image");

  const imageUrl = fileUpload.imageUrl;
  await bookModel.BookModel.createBook(book, imageUrl, createdBy);
}

//get book by id
export async function getBookById(id: string) {
  logger.info("Called getBookById");
  const data = await bookModel.BookModel.getBookById(id);
  if (!data) throw new NotFoundError("Book with this ID does not exist");

  return data;
}

//update book by id
export async function updateBookById(
  id: string,
  updatedBookData: Book,
  updatedBy: string
) {
  logger.info("Called updateBookById");
  const book = await bookModel.BookModel.getBookById(id);
  if (!book) throw new NotFoundError("Book with this Id does not exist");

  await bookModel.BookModel.updateBookById(
    id,
    {
      ...updatedBookData,
    },
    updatedBy
  );
}

//delete book by id
export async function deleteBookById(id: string) {
  logger.info("Called deleteBookById");
  await bookModel.BookModel.deleteBookById(id);
}
