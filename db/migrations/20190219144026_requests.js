const TABLE_NAME = 'requests'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments('id')
    table.integer('user_id')
    // .references('users.id').onDelete('CASCADE').notNullable();
    table.string('description').notNullable()
    table.string('session_status').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)  
};