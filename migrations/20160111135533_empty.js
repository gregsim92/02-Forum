
exports.up = function(knex, Promise) {


  // knex.schema.createTable('threads',function(table){
  // 	table.increments(),
  // 	table.integer('sub_id'),
  // })
  // knex.schema.createTable('',function(table){})
  // knex.schema.createTable('',function(table){})
  // knex.schema.createTable('',function(table){})
};

exports.down = function(knex, Promise) {
  knex.shema.dropTable('users');
};
