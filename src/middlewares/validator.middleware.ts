import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { BadRequestError } from "../error/Error";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ValidatorMiddleware");

export function validateReqQuery(schema: Schema) {
    
    return(req:Request, res:Response, next:NextFunction) => {
        logger.info("Called validateReqQuery");
        const { error, value} = schema.validate(req.query);
        if(error) {
            next( new BadRequestError(error.message));
        }
        req.query = value;

        next();
    }
}

export function validateReqBody(schema: Schema) {
    
    return(req:Request, res:Response, next:NextFunction) => {
        logger.info("Called validateReqBody");
        const { error, value} = schema.validate(req.body);
        if(error) {
            next( new BadRequestError(error.message));
        }
        req.body = value;

        next();
    }
}

export function validateReqParams(schema: Schema) {
    
    return(req:Request, res:Response, next:NextFunction) => {
        logger.info("Called validateReqParams");
        const { error, value} = schema.validate(req.params);
        if(error) {
            next( new BadRequestError(error.message));
        }
        req.params = value;

        next();
    }
}