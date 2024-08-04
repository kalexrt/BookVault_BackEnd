import { Knex } from 'knex';

const TABLE_NAME = 'users_reviews';

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
          user_id: 2,
          book_id: 2,
          rating: 5,
        },
        {
          user_id: 5,
          book_id: 5,
          rating: 3,
        },
        {
          user_id: 7,
          book_id: 7,
          rating: 4,
        },
        {
          user_id: 2,
          book_id: 9,
          rating: 3,
        },
        {
          user_id: 4,
          book_id: 11,
          rating: 2,
        },
        {
          user_id: 7,
          book_id: 14,
          rating: 1,
        },
      ]);
    });
}