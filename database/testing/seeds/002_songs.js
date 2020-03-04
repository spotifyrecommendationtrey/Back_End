
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('songs').del()
    .then(function () {
      // Inserts seed entries
      return knex('songs').insert([
        {track_id:1, artist_name: 'Kris', track_name:"Kris the greatest"}
      ]);
    });
};
