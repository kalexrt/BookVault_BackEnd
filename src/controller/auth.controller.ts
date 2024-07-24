import { NextFunction, Request, Response } from "express";
import * as authService from "../service/auth.service";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger =  loggerWithNameSpace("AuthController")

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Called login")
    const { body } = req;
    const data = await authService.login(body);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next()
  }
}