import { Response, NextFunction } from "express";
import { Request } from "../interfaces/request.interface";

import * as userService from "../service/user.service";
import { getUserQuery } from "../interfaces/user.interface";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/Error";

const logger = loggerWithNameSpace("UserController");

//get all users
export async function getUsers(
  req: Request<any, any, any, getUserQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called getUsers");
    const { query } = req;
    const data = await userService.getUsers(query);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error); // pass error to the error handling middleware
  }
}

//get user by id
export async function getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    logger.info("Called getUserbyId");
    const data = await userService.getUserById(id);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error); // pass error to the error handling middleware
  }
}

//create a new user
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;

    logger.info("Called createUser");
    await userService.createUser(body);
    res.status(HttpStatusCodes.OK).json({
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
}

//update user by id
export async function updateUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    logger.info("Called updateUserById");
    if (!req.user || !req.user.id) {
        throw new BadRequestError("User not found");
    }
    const id = parseInt(req.params.id);
    const updatedUserData = req.body;
    await userService.updateUserById(id, updatedUserData, req.user.id);
    res.status(HttpStatusCodes.OK).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
}

//delete user by id
export async function deleteUserById(req: Request<{ id: string }>, res: Response, next:NextFunction){
  try {
    logger.info("Called deleteUserById");
    const { id } = req.params; //extract the user ID
    res.status(HttpStatusCodes.OK).json(await userService.deleteUserById(parseInt(id))); //delete specific user
  } catch (error) {
    next(error);
  }
}

//delete your own id
export async function deleteSelf(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Called deleteSelf");
    res.status(HttpStatusCodes.OK).json(await userService.deleteUserById(+req.user.id));
  } catch (error) {
    next(error);
  }
}

//get your own id
export async function getMyself(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Called getMyself");
    res.status(HttpStatusCodes.OK).json(await userService.getUserByEmail(req.user.email));
  } catch (error) {
    next(error);
  }
}

//update yourself
export async function updateSelf(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Called updateSelf");
    await userService.updateUserById(+req.user.id, req.body, req.user.id);
    res.status(HttpStatusCodes.OK).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
}