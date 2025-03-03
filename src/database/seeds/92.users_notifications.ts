import { Knex } from 'knex';

const TABLE_NAME = 'users_notifications';

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
          user_id: 3,
          notification_text: "Pride and Prejudice is now available",
        },
        {
          user_id: 3,
          notification_text: "Good Omens is now available",
        },
        {
          user_id: 3,
          notification_text: "The Hobbit is now available",
        },
      ]);
    });
}