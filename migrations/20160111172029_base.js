
exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', function(table){
  	table.increments(),
  	table.string('username'),
  	table.bigInteter('steam_id'),
  	table.
  });
};

exports.down = function(knex, Promise) {
   return knex.shema.dropTable('users');

};