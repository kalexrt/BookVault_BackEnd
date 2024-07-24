import bcrypt from "bcryptjs";

import { User } from "../interfaces/user.interface";

import { getUserByEmail } from "./user.service";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/Error";

const logger = loggerWithNameSpace ("AuthService");

export async function login(body: Pick<User, "email" | "password">) {

    if(!body.email || !body.password) {
        throw new BadRequestError("Email and password are required");
    }

  logger.info("Called login")
  const existingUser = await getUserByEmail(body.email);
  if (!existingUser) {
    throw new BadRequestError("Invalid email or password");
  }
  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new BadRequestError("Invalid email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email
  };

  const accessToken = await sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  // const refreshToken = await sign(payload, config.jwt.secret!, {
  //   expiresIn: config.jwt.refreshTokenExpiryMS,
  // });

  return {
    accessToken,
    // refreshToken,
  };
}