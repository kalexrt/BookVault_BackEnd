import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";
import * as librarianService from "../service/librarian.service";

import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
import { getUserQuery } from "../interfaces/user.interface";


const logger = loggerWithNameSpace("LibrarianController");

export async function createLibrarian(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;
    
        logger.info("Called createUser");
        await librarianService.createLibrarian(body);
        res.status(HttpStatusCodes.OK).json({
          message: "Librarian created",
        });
      } catch (error) {
        next(error);
      }
}

//get all users
export async function getLibrarians(
    req: Request<any, any, any, getUserQuery>,
    res: Response,
    next: NextFunction
  ) {
    try {
      logger.info("Called getLibraians");
      const { query } = req;
      const data = await librarianService.getLibrarians(query);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error); // pass error to the error handling middleware
    }
  }