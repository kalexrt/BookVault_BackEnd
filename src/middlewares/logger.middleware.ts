import { NextFunction,Response } from "express";
import { Request } from "../interfaces/request.interface";
import loggerWithNameSpace from "../utils/logger";


const logger =  loggerWithNameSpace("RequestLogger")

export function requestLogger (req:Request, res: Response, next: NextFunction){
    logger.info(`${req.method}: ${req.url}`)

    next();
}