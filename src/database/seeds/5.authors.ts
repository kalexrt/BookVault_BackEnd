import { Knex } from 'knex';

const TABLE_NAME = 'authors';

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
        { "name": "John Green" },
        { "name": "Ernest Hemingway" },
        { "name": "Elizabeth Plath" },
        { "name": "J.K. Rowling" },
        { "name": "Stephen King" },
        { "name": "Agatha Christie" },
        { "name": "George Orwell" },
        { "name": "Jane Austen" },
        { "name": "Mark Twain" },
        { "name": "F. Scott Fitzgerald" },
        { "name": "Charles Dickens" },
        { "name": "Harper Lee" },
        { "name": "J.R.R. Tolkien" },
        { "name": "Arthur Conan Doyle" },
        { "name": "Isaac Asimov" },
        { "name": "Douglas Adams" },
        { "name": "Suzanne Collins" },
        { "name": "Kurt Vonnegut" },
        { "name": "Margaret Atwood" },
        { "name": "Neil Gaiman" },
        { "name": "Terry Pratchett" },
      ]);
    });
}