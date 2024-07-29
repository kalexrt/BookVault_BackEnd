import { Book } from "../interfaces/book.interface";
import { uploadSingleImage } from "../utils/fileUploader";
import loggerWithNameSpace from "../utils/logger";
import * as bookModel from "../model/book.model";
import { NotFoundError } from "../error/Error";

const logger = loggerWithNameSpace("BookService");

export async function createBook(book: Book, imageFile: { [key: string]: Express.Multer.File[] }, createdBy: string) {
    logger.info("Called createBook");
    const fileUpload = await uploadSingleImage(imageFile);
    if (!fileUpload) throw new Error("Error uploading image");

    const imageUrl = fileUpload.imageUrl;
    await bookModel.BookModel.createBook(book,imageUrl,createdBy);
}

export async function getBookById(id:string){
    logger.info("Called getBookById");
    const data = await bookModel.BookModel.getBookById(id);
    if(!data) throw new NotFoundError("Book with this ID does not exist");

    return data;
}

export async function deleteBookById(id:string){
    logger.info("Called deleteBookById");
    await bookModel.BookModel.deleteBookById(id);
}