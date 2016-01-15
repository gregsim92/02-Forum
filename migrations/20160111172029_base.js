
exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', function(table){
  	table.increments(),
  	table.string('username'),
  	table.bigInteger('steam_id'),
  	table.string('pic')
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');

};