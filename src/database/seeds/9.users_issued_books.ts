import { Knex } from 'knex';

const TABLE_NAME = 'users_issued_books';

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
          "user_id": 1,
          "is_returned": false,
          "issued_date": "2024-07-20T10:00:00.000Z",
          "due_date": "2024-07-27T10:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 2,
          "user_id": 2,
          "is_returned": true,
          "issued_date": "2024-07-18T11:00:00.000Z",
          "due_date": "2024-07-25T11:00:00.000Z",
          "returned_date": "2024-07-22T11:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 3,
          "user_id": 3,
          "is_returned": false,
          "issued_date": "2024-07-22T09:00:00.000Z",
          "due_date": "2024-07-29T09:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 4,
          "user_id": 4,
          "is_returned": false,
          "issued_date": "2024-07-23T08:00:00.000Z",
          "due_date": "2024-07-30T08:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 5,
          "user_id": 5,
          "is_returned": true,
          "issued_date": "2024-07-19T12:00:00.000Z",
          "due_date": "2024-07-26T12:00:00.000Z",
          "returned_date": "2024-07-25T12:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 6,
          "user_id": 6,
          "is_returned": false,
          "issued_date": "2024-07-21T14:00:00.000Z",
          "due_date": "2024-07-28T14:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 7,
          "user_id": 7,
          "is_returned": true,
          "issued_date": "2024-07-17T15:00:00.000Z",
          "due_date": "2024-07-24T15:00:00.000Z",
          "returned_date": "2024-07-20T15:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 8,
          "user_id": 1,
          "is_returned": false,
          "issued_date": "2024-07-25T13:00:00.000Z",
          "due_date": "2024-08-01T13:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 9,
          "user_id": 2,
          "is_returned": true,
          "issued_date": "2024-07-24T16:00:00.000Z",
          "due_date": "2024-07-31T16:00:00.000Z",
          "returned_date": "2024-07-27T16:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 10,
          "user_id": 3,
          "is_returned": false,
          "issued_date": "2024-07-26T17:00:00.000Z",
          "due_date": "2024-08-02T17:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 11,
          "user_id": 4,
          "is_returned": true,
          "issued_date": "2024-07-23T18:00:00.000Z",
          "due_date": "2024-07-30T18:00:00.000Z",
          "returned_date": "2024-07-28T18:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 12,
          "user_id": 5,
          "is_returned": false,
          "issued_date": "2024-07-25T19:00:00.000Z",
          "due_date": "2024-08-01T19:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 13,
          "user_id": 6,
          "is_returned": false,
          "issued_date": "2024-07-21T20:00:00.000Z",
          "due_date": "2024-07-28T20:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 14,
          "user_id": 7,
          "is_returned": true,
          "issued_date": "2024-07-22T21:00:00.000Z",
          "due_date": "2024-07-29T21:00:00.000Z",
          "returned_date": "2024-07-25T21:00:00.000Z",
          "created_by": 1,
        },
        {
          "book_id": 15,
          "user_id": 1,
          "is_returned": false,
          "issued_date": "2024-07-28T22:00:00.000Z",
          "due_date": "2024-08-04T22:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 1,
          "user_id": 4,
          "is_returned": false,
          "issued_date": "2024-07-28T22:00:00.000Z",
          "due_date": "2024-08-04T22:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        },
        {
          "book_id": 1,
          "user_id": 5,
          "is_returned": false,
          "issued_date": "2024-07-28T22:00:00.000Z",
          "due_date": "2024-08-04T22:00:00.000Z",
          "returned_date": null,
          "created_by": 1,
        }
      ]);
    });
}