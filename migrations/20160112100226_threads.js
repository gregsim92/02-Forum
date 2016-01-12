
exports.up = function(knex, Promise) {
   return knex.schema.createTable('threads', function(table){
  	table.increments(),
  	table.integer('sub_id'),
  	table.string('thread_name'),
  	table.text('thread_desc'),
  	table.integer('thread_views')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('threads');
};
