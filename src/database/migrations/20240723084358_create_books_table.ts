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
    table.bigInteger('isbn').notNullable().unique().unsigned();
    table.date('published_date').notNullable();
    table.integer('rating').defaultTo(0);
    table.integer('total_reviews').defaultTo(0);
    table.integer('total_copies').notNullable().defaultTo(1);
    table.integer('available_copies').notNullable().defaultTo(1);


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