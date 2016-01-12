
exports.up = function(knex, Promise) {
  return knex.schema.createTable('forums', function(table){
  	table.increments(),
  	table.string('category')
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('forums');
};
