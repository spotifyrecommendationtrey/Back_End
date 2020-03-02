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
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.put('/dashboard/:id', restricted, (req, res) => {
    const changes = req.body;
    const id = req.params.id
    Users.findById(id)
        .then(user => {
            if (user) {
                Users.update(changes, id)
                    .then(
                        res.status(202).json({Message: 'Username Succesfully Changed'})
                    )
            } else {
                res.status(404).json({ message: 'User with given id does not exist.' })
            }

        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
})

router.post('/dashboard/:id/favorites',restricted,favMiddleware, (req,res) => {

    Users.addToFavorites(req.body)
    .then(favoriteList => {
        res.status(201).json(favoriteList)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.get('/dashboard/:id/favorites',restricted, (req,res) => {
    const id = req.params.id

    Users.findFavoritesById(id)
    .then(favorites => {
        res.status(200).json(favorites)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.delete('/dashboard/:id/favorites/:song_id',restricted, (req,res) => {
    const song = req.params.song_id
    const id = req.params.id
    Users.removeSongFavorite(id, song)
    .then(song => {
        if(song === 0){
            res.status(404).json({errorMessage: 'Song with that id doesnt exist'})
        } else {
            res.status(200).json({errorMessage: 'Song Deleted Succesfuly'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

function favMiddleware(req, res, next) {
    const song = req.body.song_id
    const user = req.body.user_id
    if(!song){
        return res.status(400).json({errorMessage: 'You are missing the song_id'})
    } else if(!user) {
        return res.status(400).json({errorMessage: 'You are missing the user_id'})
    } else {
        next()
    }
}



module.exports = router;