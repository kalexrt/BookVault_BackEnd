import { Knex } from 'knex';

const TABLE_NAME = 'books';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string('title').notNullable();
    table.string('isbn').notNullable().unique();
    table.date('published_date').notNullable();
    table.float('rating', 2, 1).defaultTo(0.0);
    table.integer('total_reviews').defaultTo(0);
    table.integer('total_copies').notNullable().defaultTo(1);
    table.integer('available_copies').notNullable().defaultTo(1);
    table.string("image_link", 255).nullable();


    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    
    table
      .bigInteger('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
      
    table.timestamp('updated_at').nullable();
    
    table
      .bigInteger('updated_by')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}