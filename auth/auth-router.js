const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 


const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets.js");




router.post('/register', userMiddleware, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', userMiddleware, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); 

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Passwords do not match from register" });
      }
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json({ error: "/login error" });
    });
});

  
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, jwtSecret, options);
}

function userMiddleware(req, res, next){
  const username = req.body.username
  const password = req.body.password
  if(!username){
    res.status(400).json({errorMessage: "Please provide username"})
  } else if(!password){
    res.status(400).json({errorMessage: "Please provide password"})
  } else {
    next()
  }
}
module.exports = router;
