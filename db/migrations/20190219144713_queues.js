const TABLE_NAME = 'queues'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table){
    table.increments('id')
    table.integer('helper_id').notNullable()
    table.integer('request_id').references('requests.id').onDelete('CASCADE').notNullable();
    table.timestamp('deleted_at').nullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME)  
};
