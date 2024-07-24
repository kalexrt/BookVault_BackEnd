import { getUserQuery, User } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./Base.model";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
  //create user
  static async create(user: User) {
    logger.info('Called create');
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age
    };

    const userId = await this.queryBuilder().insert(userToCreate).table("users").returning("id");

    const userRole = {
      user_id: +userId[0].id, //get id from the array
      role_id: 3 // for normal users(member role)
    };

    await this.queryBuilder().insert(userRole).table("users_roles");
  }

  //update user
  static async update(id: string, user: User, updatedBy: string) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: new Date(),
      updated_by: updatedBy
    };
    await this.queryBuilder().update(userToUpdate).table("users").where({ id });
  }

  //get user by email
  static async getByEmail(email: string) {
    logger.info("Called getByEmail");

    const result = await this.queryBuilder()
      .select("users.id", "users.email", "users.name", "users.password","users.age","users.gender","users.total_books_borrowed")
      .from("users")
      .where("users.email", email)
      .first();
    const roleArray = await this.getRoles(+result.id);
    result.roles = roleArray;
    return result;
  }

  //get user roles
  static async getRoles(id: number) {
    logger.info("Called getRoles");

    const roleId = await this.queryBuilder()
      .select("role_id")
      .from("users_roles")
      .where("user_id", id);
    console.log(roleId);

    const roles = await Promise.all(
      roleId.map(async (role) => {
        const result = await this.queryBuilder()
          .select("name as role")
          .from("roles")
          .where({ id: role.role_id });
        return result[0].role;
      })
    );
    return roles;
  }

  //get user by id
  static async getUserById(id: string){
    return await this.queryBuilder()
    .select('*')
    .from('users')
    .where({id})
    .first();
  }

  //delete the user by the id
  static async deleteUserById(id: string) {
    logger.info("Called deleteUserById");
    return await this.queryBuilder().delete().from("users").where({ id });
  }

  //get all users
  static getUsers(filter: getUserQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "email", "name","age","gender","total_books_borrowed")
      .table("users")
      .limit(size!)
      .offset((page! - 1) * size!);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  //count users
  static count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}