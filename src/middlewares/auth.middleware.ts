import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "../config";
import { User } from "../interfaces/user.interface";
import { Request } from "../interfaces/request.interface";
import { UnauthenticatedError } from "../error/Error";
import { getUserByEmail } from "../service/user.service";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Improper Token Format"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret) as User;
    req.user = user;
    next();
  }catch(e){
    throw new UnauthenticatedError("Expired or Unexisting Token");
  }
}

export function authorize(role: string){
  return async (req: Request, res: Response, next: NextFunction) =>{
    const user_email = req.user.email;
    const user = await getUserByEmail(user_email);
    console.log(user.roles);
    if(!user.roles.includes(role)) {
      next(new UnauthenticatedError("Forbidden"));
    }
    next();
  }
}