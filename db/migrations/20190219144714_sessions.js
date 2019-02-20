const TABLE_NAME = 'sessions'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments('id')
    table.integer('request_id').references('requests.id').onDelete('CASCADE').notNullable();
    table.integer('queue_id').references('queues.id').onDelete('CASCADE').notNullable();
    table.string('session_status').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)  
};
