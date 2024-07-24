import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "../config";
import { User } from "../interfaces/user.interface";
import { Request } from "../interfaces/request.interface";
import { UnauthenticatedError } from "../error/Error";

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
    const user = verify(token[1], config.jwt.secret!) as User;
    req.user = user;
    next();
  }catch(e){
    throw new UnauthenticatedError("Expired or Unexisting Token");
  }
}

export function authorize(role: string){
  return (req: Request, res: Response, next: NextFunction) =>{
    const user = req.user!;
    if(!user.roles!.includes(role)) {
      next(new UnauthenticatedError("Forbidden"));
    }

    next();
  }
}