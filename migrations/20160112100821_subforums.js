
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subforums', function(table){
  	table.increments(),
  	table.string('sub_name'),
  	table.string('category'),
  	table.text('sub_desc')

  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('subforums');

};
