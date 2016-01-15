
exports.up = function(knex, Promise) {
     return knex.schema.createTable('posts', function(table){
  	table.increments(),
  	table.string('user_id'),
  	table.timestamp('post_time'),
  	table.integer('thread_id'),
  	table.text('post_html')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
