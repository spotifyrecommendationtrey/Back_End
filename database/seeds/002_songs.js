
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('songs').del()
    .then(function () {
      // Inserts seed entries
      return knex('songs').insert([
        {track_id:1, artist_name: 'Kris', track_name:"Kris the greatest"},
        {track_id:2, artist_name: 'Travis Scott', track_name:"SICKO MODE"},
        {track_id:3, artist_name: 'Josh A, lamjakehill', track_name:"Gucci Coffin"},
        {track_id:4, artist_name: 'Logic, Eminem', track_name:"Homicide(feat.Eminem)"}

      ]);
    });
};
