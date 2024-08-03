import { Knex } from 'knex';

const TABLE_NAME = 'users_wishlist';

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
          "book_id": 1,
          "user_id": 3,
        },
        {
          "book_id": 5,
          "user_id": 3,
          "is_active": false,
        }
      ]);
    });
}