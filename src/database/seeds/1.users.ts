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
          gender:'male'
        },
        {
          name: "Librarian",
          email: "librarian@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:1,
          gender:'other'
        },
        {
          name: "User 3",
          email: "user3@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:3,
          gender:'other'
        },
        {
          name: "User 4",
          email: "user4@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:4,
          gender:'other'
        },
        {
          name: "User 5",
          email: "user5@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:5,
          gender:'other'
        },
        {
          name: "User 6",
          email: "user6@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:6,
          gender:'other'
        },
        {
          name: "User 7",
          email: "user7@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:7,
          gender:'other'
        },
        {
          name: "User 8",
          email: "user8@gmail.com",
          password: "$2a$10$SEZwYpl9zZs4ls/E3OmlC.Cc0HpSTkRI7V19itKtTHUzpQInEQiT2",
          age:8,
          gender:'other'
        },
      ]);
    });
}