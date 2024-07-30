import { Knex } from 'knex';

const TABLE_NAME = 'books_authors';

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
        { "book_id": 1, "author_id": 20 },
        { "book_id": 1, "author_id": 21 },
        { "book_id": 2, "author_id": 1 },
        { "book_id": 3, "author_id": 12 },
        { "book_id": 4, "author_id": 7 },
        { "book_id": 5, "author_id": 8 },
        { "book_id": 6, "author_id": 10 },
        { "book_id": 7, "author_id": 13 },
        { "book_id": 8, "author_id": 4 },
        { "book_id": 9, "author_id": 15 },
        { "book_id": 10, "author_id": 11 },
        { "book_id": 11, "author_id": 7 },
        { "book_id": 12, "author_id": 5 },
        { "book_id": 13, "author_id": 18 },
        { "book_id": 14, "author_id": 9 },
        { "book_id": 15, "author_id": 19 },
        { "book_id": 16, "author_id": 16 },
        { "book_id": 17, "author_id": 17 },
        { "book_id": 18, "author_id": 14 },
        { "book_id": 19, "author_id": 3 },
        { "book_id": 20, "author_id": 2 },
      ]);
    });
}