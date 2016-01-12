
exports.up = function(knex, Promise) {
  return knex.schema.createTable('is_banned', function(table){
  	table.increments(),
  	table.integer('user_id'),
  	table.integer('thread_id'),
  	table.boolean('banned_status')
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('is_banned');
};
