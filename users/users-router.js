const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
        console.log(err),
        res.send(err)});
});

router.get('/dashboard/songs', (req,res) => {
    Users.getAllSongs()
    .then(songs => {
        res.status(200).json(songs)
    })
    .catch(eror => {
        console.log(error)
        res.status(500).json(error)
    })
})
module.exports = router;