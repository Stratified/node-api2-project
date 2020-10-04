const express = require('express');
const postsRouter = require('./posts-router');
const server = express();

server.use(express.json());
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello' });
});

module.exports = server;
