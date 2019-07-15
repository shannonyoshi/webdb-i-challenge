const express = require('express');

const db = require('./data/dbConfig.js');
const AccountsRouter = require("./data/accounts-router")

const server = express();

server.use(express.json());
server.use('/accounts', AccountsRouter)

server.get('/', (req, res)=> {
    res.send(`<h3>Server Running</h3>`)
})

module.exports = server;