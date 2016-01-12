
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subforums', function(table){
  	table.increments(),
  	table.string('sub_name'),
  	table.text('sub_desc'),
  	table.integer('sub_views'),
  	table.integer('sub_thread_count')
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('subforums');

};
