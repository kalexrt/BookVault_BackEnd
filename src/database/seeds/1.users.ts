import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "Kalash",
          email: "kalash1@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:22,
          gender:'Male'
        }
      ]);
    });
}