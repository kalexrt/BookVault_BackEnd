import { NextFunction, Response } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import * as bookService from "../service/book.service";


const logger = loggerWithNameSpace("BookController");

export async function createBook(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try{
        logger.info("Called createBook");
        const { body } = req;
        const imageFile = req.files as { [key:string]: Express.Multer.File[] };
        const createdBy = req.user.id;

        await bookService.createBook(body, imageFile,createdBy);
        res.status(HttpStatusCodes.OK).json({message:"Book created successfully"});
    }catch(error){
        next(error);
    }
}


export async function getBookById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try{
        logger.info("Called getBookById");
        const { id } = req.params;
        const data = await bookService.getBookById(id);
        res.status(HttpStatusCodes.OK).json(data);
    }catch(error){
        next(error);
    }
}

export async function deleteBookById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try{
        logger.info("Called deleteBookById");
        const { id } = req.params;
        await bookService.deleteBookById(id);
        res.status(HttpStatusCodes.OK).json({message:"Book deleted successfully"});
    }catch(error){
        next(error);
    }
}