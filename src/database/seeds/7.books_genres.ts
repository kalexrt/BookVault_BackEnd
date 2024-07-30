import { Knex } from 'knex';

const TABLE_NAME = 'books_genres';

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
        { "book_id": 1, "genre_id": 3 },
        { "book_id": 1, "genre_id": 5 },
        { "book_id": 2, "genre_id": 5 },
        { "book_id": 3, "genre_id": 6 },
        { "book_id": 4, "genre_id": 13 },
        { "book_id": 5, "genre_id": 5 },
        { "book_id": 6, "genre_id": 3 },
        { "book_id": 7, "genre_id": 3 },
        { "book_id": 8, "genre_id": 4 },
        { "book_id": 9, "genre_id": 15 },
        { "book_id": 10, "genre_id": 9 },
        { "book_id": 11, "genre_id": 13 },
        { "book_id": 12, "genre_id": 16 },
        { "book_id": 13, "genre_id": 12 },
        { "book_id": 14, "genre_id": 13 },
        { "book_id": 15, "genre_id": 7 },
        { "book_id": 16, "genre_id": 3 },
        { "book_id": 17, "genre_id": 6 },
        { "book_id": 18, "genre_id": 3 },
        { "book_id": 19, "genre_id": 4 },
        { "book_id": 20, "genre_id": 15 },
      ]);
    });
}