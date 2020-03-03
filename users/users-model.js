const db = require('../database/dbConfig.js');

module.exports = {
  add,
  update,
  find,
  findBy,
  findById,
  getAllSongs,
  addToFavorites,
  removeSongFavorite,
  findFavoritesById
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function update(changes, id){
  return db('users').where('users.id', id).update(changes)
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getAllSongs() {
    return db('songs')
}

function addToFavorites(data){
  return db('favorites')
  .insert(data)
  .then(ids => {
    return findFavoritesById(data.user_id)
  })
}

function findFavoritesById(id){
  return db('favorites')
    .where('user_id', id)
    .join('songs', 'favorites.song_id', 'songs.track_id')
    .select( 'track_id','track_name', 'artist_name')
    
}

function removeSongFavorite(user_id, song_id){
  return db('favorites')
  .where({ user_id, song_id})
  .del()
}