import { User, getUserQuery } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("LibrarianModel");

export class LibrarianModel extends BaseModel {
  //create librarian
  static async createLibrarian(user: User) {
    logger.info("Called create librarian");
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age,
    };

    const userId = await this.queryBuilder()
      .insert(userToCreate)
      .table("users")
      .returning("id");

    const userRole = {
      user_id: +userId[0].id, //get id from the array
      role_id: 2, // for librarians (special access)
    };
    const secondRole = {
      user_id: +userId[0].id, //get id from the array
      role_id: 3, // for normal access
    }

    await this.queryBuilder().insert(userRole).table("users_roles");
    await this.queryBuilder().insert(secondRole).table("users_roles");
  }

  //get all librarians
  static getLibrarians(filter: getUserQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select(
        "users.id",
        "users.email",
        "users.name",
        "users.age",
        "users.gender"
      )
      .from("users")
      .join("users_roles", "users.id", "users_roles.user_id")
      .where("users_roles.role_id", 2)
      .limit(size)
      .offset((page - 1) * size);

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  //count librarians
  static count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder()
      .count("*")
      .table("users_roles")
      .where("role_id", 2)
      .first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}
