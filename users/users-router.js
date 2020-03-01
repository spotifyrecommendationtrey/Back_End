const router = require('express').Router();

const Users = require('./users-model.js');



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
                    .then(newUser => {
                        res.status(202).json(newUser)
                    })
            } else {
                res.status(404).json({ message: 'User with given id does not exist.' })
            }

        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
})

router.post('/dashboard/:id/favorites', (req,res) => {

    Users.addToFavorites(req.body)
    .then(favoriteList => {
        res.status(201).json(favoriteList)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.get('/dashboard/:id/favorites', (req,res) => {
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

router.delete('/dashboard/:id/favorites/:song_id', (req,res) => {
    const song = req.params.song_id
    const id = req.params.id
    Users.removeSongFavorite(id, song)
    .then(song => {
        if(song === 0){
            res.status(404).json({message: 'Song with that id doesnt exist'})
        } else {
            res.status(200).json({message: 'Song Deleted Succesfuly'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})
module.exports = router;