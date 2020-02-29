
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl => {
      tbl.increments();

      tbl.varchar("username", 128)
      .notNullable()
      .unique()

      tbl.varchar('password', 128)
      .notNullable()
  })

  .createTable('songs', tbl => {
      tbl.varchar('track_id', 255)
      .unique()

      tbl.varchar('artist_name', 255)

      tbl.varchar('track_name', 255)
  })

  .createTable('favorites', tbl => {

    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

    tbl.varchar('song_id', 255)
    .unsigned()
    .notNullable()
    .references('track_id')
    .inTable('songs')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('songs')
    .dropTableIfExists('user')
};
