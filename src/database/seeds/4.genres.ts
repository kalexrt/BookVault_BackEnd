import { Knex } from "knex";

const TABLE_NAME = "genres";

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
        { "name": "Comedy" },
        { "name": "Horror Comedy" },
        { "name": "Fantasy" },
        { "name": "Science Fiction" },
        { "name": "Romance" },
        { "name": "Mystery" },
        { "name": "Thriller" },
        { "name": "Historical" },
        { "name": "Biography" },
        { "name": "Self-Help" },
        { "name": "Adventure" },
        { "name": "Young Adult" },
        { "name": "Dystopian" },
        { "name": "Paranormal" },
        { "name": "Horror" },
        { "name": "Literary Fiction" },
        { "name": "Magical Realism" },
        { "name": "Graphic Novel" },
        { "name": "Poetry" },
        { "name": "Memoir" },
      ]);
    });
}
