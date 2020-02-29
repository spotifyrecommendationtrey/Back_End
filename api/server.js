const express = require("express")


const authRouter = require('../auth/auth-router.js');
const usersRouter = require("../users/users-router.js");
const restricted = require('../auth/restricted-middleware.js')

const server = express();

server.use(express.json())

server.use("/api/users", restricted, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;