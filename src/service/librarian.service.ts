import bcrypt from "bcryptjs";
import { getUserQuery, User } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError, NotFoundError } from "../error/Error";
import { LibrarianModel } from "../model/librarian.model";

const logger = loggerWithNameSpace("LibrarianService");

// create a new user with a hashed password
export async function createLibrarian(user: User) {
  logger.info("Called createUser");
  if (!user.password) {
    throw new BadRequestError("Password is required");
  }
  const password = await bcrypt.hash(user.password, 10);
  LibrarianModel.createLibrarian({
    ...user,
    password,
  });
}

// get all librarians
export const getLibrarians = async (query: getUserQuery) => {
  const data = await LibrarianModel.getLibrarians(query);
  if (!data) throw new NotFoundError("No users found");
  const count = await LibrarianModel.count(query);
  const meta = {
    page: query.page?query.page:1,
    size: data.length,
    total: +count.count,
  };
  return { data, meta };
};
